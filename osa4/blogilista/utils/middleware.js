const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('----------------------------------------------------------------------')
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('----------------------------------------------------------------------')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    console.log('author')
    console.log(authorization)
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
        console.log(request.token)
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'CastError' && error.path === '_id') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor }