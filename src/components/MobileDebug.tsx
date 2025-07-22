import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'log' | 'error' | 'warn';
}

export const MobileDebug: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Interceptar console.log, console.error e console.warn
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      originalLog(...args);
      addLog('log', args.join(' '));
    };

    console.error = (...args) => {
      originalError(...args);
      addLog('error', args.join(' '));
    };

    console.warn = (...args) => {
      originalWarn(...args);
      addLog('warn', args.join(' '));
    };

    // Mostrar debug em desenvolvimento
    if (import.meta.env.DEV) {
      setIsVisible(true);
    }

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  const addLog = (type: LogEntry['type'], message: string) => {
    setLogs(prev => [...prev.slice(-20), {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }]);
  };

  if (!isVisible) return null;

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: '30vh',
        overflow: 'auto',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        fontSize: '12px',
        p: 1,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="caption" sx={{ color: 'white' }}>Debug Console</Typography>
        <IconButton size="small" onClick={() => setIsVisible(false)} sx={{ color: 'white' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      {logs.map((log, index) => (
        <Box
          key={index}
          sx={{
            color: log.type === 'error' ? '#ff6b6b' : log.type === 'warn' ? '#ffd43b' : '#4dabf7',
            fontFamily: 'monospace',
            mb: 0.5,
          }}
        >
          [{log.timestamp}] {log.message}
        </Box>
      ))}
    </Paper>
  );
};
