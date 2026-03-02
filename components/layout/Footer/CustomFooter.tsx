import React from 'react'
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material'

export const CustomFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#c5cae9',
        color: '#1a237e',
        mt: 8,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: 'repeat(4, 1fr)' }}
          gap={4}
        >
          {/* Company Info */}
          <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              YourStore
            </Typography>
            <Typography variant="body2">
              We provide high-quality B2B commerce solutions with seamless
              ordering and account management experience.
            </Typography>
          </Box>

          {/* Links */}
          <Box >
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link  sx={{ color: '#1a237e' }} href="/">Home</Link>
              <Link  sx={{ color: '#1a237e' }} href="#">Products</Link>
              <Link  sx={{ color: '#1a237e' }} href="#">About Us</Link>
              <Link  sx={{ color: '#1a237e' }} href="#">Contact</Link>
            </Stack>
          </Box>

          {/* Customer Support */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Support
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">FAQ</Typography>
              <Typography variant="body2">Shipping Policy</Typography>
              <Typography variant="body2">Return Policy</Typography>
              <Typography variant="body2">Privacy Policy</Typography>
            </Stack>
          </Box>

          {/* Contact Details */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Pune, Maharashtra, India
            </Typography>
            <Typography variant="body2">
              +91 98765 43210
            </Typography>
            <Typography variant="body2">
              support@yourstore.com
            </Typography>
          </Box>
        </Box>

        {/* Bottom Section */}
        <Box
          mt={5}
          pt={3}
          borderTop="1px solid #374151"
          textAlign="center"
        ></Box>
          <Typography variant="body2">
            © {new Date().getFullYear()} YourStore. All rights reserved.
          </Typography>
        
      </Container>
    </Box>
  )
}

export default CustomFooter