const errorHandler = (err, req, res, next) => {
  if (process.env.ENVIRONMENT === 'production') {
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error :('
    });
  } else {
    res.status(500).json({ 
      success: false, 
      error: err.message
    });
  }
}

module.exports = errorHandler;