import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShoppingCart, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const value = {
    showToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[10000] space-y-2">
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Individual Toast Component
const Toast = ({ toast, onClose }) => {
  const { message, type, duration } = toast;

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    cart: <ShoppingCart className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    cart: 'bg-slate-400',
  };

  // Progress bar colors (slightly brighter than main colors)
  const progressColors = {
    success: 'bg-green-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
    cart: 'bg-slate-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className={`relative ${colors[type] || colors.info} text-white shadow-lg min-w-[400px] max-w-md overflow-hidden`}
    >
      {/* Toast Content */}
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="flex-shrink-0">
          {icons[type] || icons.info}
        </div>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <motion.button
          onClick={onClose}
          className="flex-shrink-0 ml-2 hover:bg-white/20 rounded p-1 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
        <motion.div
          className={`h-full ${progressColors[type] || progressColors.info} ml-auto`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{
            duration: duration / 1000, 
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
};