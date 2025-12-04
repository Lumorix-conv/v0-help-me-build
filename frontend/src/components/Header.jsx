"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../store/slices/authSlice"
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from "@mui/material"
import { AccountCircle } from "@mui/icons-material"

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "var(--primary)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingY: "var(--space-3)",
          paddingX: "var(--space-6)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "var(--text-xl)",
            color: "#ffffff",
            letterSpacing: "-0.5px",
          }}
        >
          RegisHub
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <Typography
            variant="body2"
            sx={{
              color: "#ffffff",
              fontWeight: 500,
            }}
          >
            {user?.full_name || "User"}
          </Typography>
          <Button color="inherit" onClick={handleMenu} startIcon={<AccountCircle />}>
            Menu
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
            <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
