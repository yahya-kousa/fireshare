import * as React from 'react'
import { Box, Typography, Button, IconButton, Popover } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { DayPicker } from 'react-day-picker'
import './datepicker-dark.css'
import { rowBoxSx, timeInputStyle } from '../../common/modalStyles'

const DateField = ({ selectedDate, selectedTime, onDateChange, onTimeChange }) => {
  const [anchor, setAnchor] = React.useState(null)

  const display = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      (selectedTime ? ` at ${selectedTime}` : '')
    : null

  return (
    <>
      <Box
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{ ...rowBoxSx, cursor: 'pointer', py: 1.1, '&:hover': { borderColor: '#FFFFFF55' } }}
      >
        <CalendarMonthIcon sx={{ color: '#FFFFFF66', fontSize: 20 }} />
        <Typography sx={{ color: display ? 'white' : '#FFFFFF4D', fontSize: 14, flex: 1 }}>
          {display || 'Pick a date…'}
        </Typography>
        {selectedDate && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onDateChange(null)
              onTimeChange('')
            }}
            sx={{ color: '#FFFFFF66', '&:hover': { color: 'white' }, p: 0.25 }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { bgcolor: 'transparent', boxShadow: 'none', mt: 0.5 } } }}
      >
        <div className="fireshare-rdp">
          <DayPicker
            animate
            mode="single"
            selected={selectedDate}
            onSelect={(d) => onDateChange(d || null)}
            defaultMonth={selectedDate || new Date()}
            captionLayout="dropdown"
            startMonth={new Date(1970, 0)}
            endMonth={new Date(new Date().getFullYear() + 1, 11)}
          />
          <Box sx={{ px: 1, pb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ color: '#FFFFFFB3', fontSize: 13 }}>Time</Typography>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => onTimeChange(e.target.value)}
              style={timeInputStyle}
            />
            <Button
              size="small"
              variant="contained"
              onClick={() => setAnchor(null)}
              sx={{ bgcolor: '#3399FF', '&:hover': { bgcolor: '#1976D2' }, minWidth: 60 }}
            >
              Done
            </Button>
          </Box>
        </div>
      </Popover>
    </>
  )
}

export default DateField
