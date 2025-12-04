const requestLogger = {
  logRequest: (method, endpoint, data = {}) => {
    console.log(`[v0] REQUEST: ${method} ${endpoint}`)
    console.log(`[v0] Payload:`, JSON.stringify(data, null, 2))
    console.log(`[v0] Timestamp: ${new Date().toISOString()}`)
  },

  logResponse: (method, endpoint, status, data = {}) => {
    const statusText = status >= 400 ? "ERROR" : "SUCCESS"
    console.log(`[v0] RESPONSE [${statusText}]: ${method} ${endpoint} - Status: ${status}`)
    console.log(`[v0] Data:`, JSON.stringify(data, null, 2))
  },

  logError: (endpoint, error) => {
    console.error(`[v0] ERROR at ${endpoint}:`)
    console.error(`[v0] Message:`, error.message)
    console.error(`[v0] Stack:`, error.stack)
  },

  logPerformance: (endpoint, duration) => {
    console.log(`[v0] PERFORMANCE: ${endpoint} took ${duration}ms`)
  },
}

module.exports = requestLogger
