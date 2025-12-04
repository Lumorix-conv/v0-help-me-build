"use client"

import React from "react"

import { useState } from "react"
import { Box, Button, Typography, Paper, Avatar } from "@mui/material"
import { CloudUpload, Close } from "@mui/icons-material"
import { toast } from "react-toastify"

const ImageUploader = ({ label, onUpload, preview, isLoading }) => {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = React.useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleChange = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = (file) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB")
      return
    }

    onUpload(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onUpload(null)
  }

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
        {label}
      </Typography>

      {preview ? (
        <Paper sx={{ p: 2, textAlign: "center", position: "relative" }}>
          <Avatar src={preview} sx={{ width: 120, height: 120, mx: "auto", mb: 2 }} />
          <Typography variant="body2" sx={{ mb: 2 }}>
            Image selected
          </Typography>
          <Button size="small" startIcon={<Close />} onClick={handleRemove} disabled={isLoading}>
            Remove
          </Button>
        </Paper>
      ) : (
        <Paper
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          sx={{
            p: 3,
            textAlign: "center",
            border: "2px dashed #ccc",
            borderRadius: 2,
            backgroundColor: dragActive ? "#f5f5f5" : "#fafafa",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "#1976d2",
              backgroundColor: "#f0f7ff",
            },
          }}
        >
          <CloudUpload sx={{ fontSize: 48, color: "#1976d2", mb: 1 }} />
          <Typography variant="body2" sx={{ mb: 1 }}>
            Drag and drop your image here or click to browse
          </Typography>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Supported formats: JPG, PNG, GIF. Max size: 5MB
          </Typography>
          <Button variant="contained" size="small" onClick={handleClick} sx={{ mt: 2 }} disabled={isLoading}>
            Browse
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }} />
        </Paper>
      )}
    </Box>
  )
}

export default ImageUploader
