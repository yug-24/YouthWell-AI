// Media Handling API Routes for YouthWell AI
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../storage';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// Configure multer for file uploads
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

// File filter for audio and video only
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/webm',
    'video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only audio and video files are allowed'));
  }
};

const upload = multer({
  storage: uploadStorage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

// Upload audio/video file
router.post('/upload', authenticateToken, upload.single('media'), async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { relatedJournalId } = req.body;
    
    // Determine file type
    const fileType = req.file.mimetype.startsWith('audio/') ? 'audio' : 'video';
    
    // Save file metadata to database
    const mediaFile = await storage.createMediaFile({
      userId: req.user!.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path,
      fileType,
      relatedJournalId: relatedJournalId ? parseInt(relatedJournalId) : undefined,
      isPublic: false,
    });

    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: mediaFile.id,
        filename: mediaFile.filename,
        originalName: mediaFile.originalName,
        fileType: mediaFile.fileType,
        fileSize: mediaFile.fileSize,
        createdAt: mediaFile.createdAt,
        downloadUrl: `/api/media/${mediaFile.filename}`,
      },
    });
  } catch (error) {
    console.error('File upload error:', error);
    
    // Clean up uploaded file if database save failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Stream media file with range request support
router.get('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Get file metadata from database
    const mediaFile = await storage.getMediaFileByFilename(filename);
    if (!mediaFile) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if file exists on disk
    if (!fs.existsSync(mediaFile.filePath)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    const stat = fs.statSync(mediaFile.filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // Handle range requests for streaming
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      
      const file = fs.createReadStream(mediaFile.filePath, { start, end });
      
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': mediaFile.mimeType,
      });
      
      file.pipe(res);
    } else {
      // Send entire file
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': mediaFile.mimeType,
      });
      
      fs.createReadStream(mediaFile.filePath).pipe(res);
    }
  } catch (error) {
    console.error('File streaming error:', error);
    res.status(500).json({ error: 'File streaming failed' });
  }
});

// Get user's uploaded media files
router.get('/user/files', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const mediaFiles = await storage.getMediaFilesByUserId(req.user!.id);

    res.json({
      files: mediaFiles.map(file => ({
        id: file.id,
        filename: file.filename,
        originalName: file.originalName,
        fileType: file.fileType,
        fileSize: file.fileSize,
        duration: file.duration,
        relatedJournalId: file.relatedJournalId,
        createdAt: file.createdAt,
        downloadUrl: `/api/media/${file.filename}`,
        streamUrl: `/api/media/${file.filename}`,
      })),
    });
  } catch (error) {
    console.error('Media files fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete media file
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const fileId = parseInt(req.params.id);
    
    // Get file metadata first
    const mediaFile = await storage.getMediaFile(fileId, req.user!.id);
    if (!mediaFile) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete file from database
    const deleted = await storage.deleteMediaFile(fileId, req.user!.id);
    if (!deleted) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete file from disk
    try {
      if (fs.existsSync(mediaFile.filePath)) {
        fs.unlinkSync(mediaFile.filePath);
      }
    } catch (diskError) {
      console.error('Error deleting file from disk:', diskError);
      // Continue - database deletion succeeded even if disk deletion failed
    }

    res.json({
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get file info without downloading
router.get('/:filename/info', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { filename } = req.params;
    
    const mediaFile = await storage.getMediaFileByFilename(filename);
    if (!mediaFile) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if user owns the file or if it's public
    if (mediaFile.userId !== req.user!.id && !mediaFile.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({
      file: {
        id: mediaFile.id,
        filename: mediaFile.filename,
        originalName: mediaFile.originalName,
        fileType: mediaFile.fileType,
        fileSize: mediaFile.fileSize,
        duration: mediaFile.duration,
        mimeType: mediaFile.mimeType,
        isPublic: mediaFile.isPublic,
        createdAt: mediaFile.createdAt,
      },
    });
  } catch (error) {
    console.error('File info fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;