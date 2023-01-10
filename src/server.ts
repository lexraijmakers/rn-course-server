import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'
import { context } from './context'
import { ApolloServer } from '@apollo/server'

async function startApolloServer() {
    const server = new ApolloServer({ schema })

    const { url } = await startStandaloneServer(server, {
        context: context,
        listen: { port: 4000 }
    })

    console.log(`🚀  Server ready at ${url}`)
}

startApolloServer()
