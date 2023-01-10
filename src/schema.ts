import { intArg, makeSchema, nonNull, objectType, inputObjectType, arg } from 'nexus'
import { Context } from './context'

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allUsers', {
            type: 'User',
            resolve: (_parent, _args, context: Context) => {
                return context.prisma.user.findMany()
            }
        })
    }
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.nonNull.field('signupUser', {
            type: 'User',
            args: {
                data: nonNull(
                    arg({
                        type: 'UserCreateInput'
                    })
                )
            },
            resolve: (_, args, context: Context) => {
                return context.prisma.user.create({
                    data: {
                        name: args.data.name,
                        age: args.data.age
                    }
                })
            }
        })

        t.field('deleteUser', {
            type: 'User',
            args: {
                id: nonNull(intArg())
            },
            resolve: (_, args, context: Context) => {
                return context.prisma.user.delete({
                    where: { id: args.id }
                })
            }
        })
    }
})

const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('name')
        t.nonNull.int('age')
    }
})

const UserCreateInput = inputObjectType({
    name: 'UserCreateInput',
    definition(t) {
        t.nonNull.string('name')
        t.nonNull.int('age')
    }
})

export const schema = makeSchema({
    types: [Query, Mutation, User, UserCreateInput],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts'
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context'
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma'
            }
        ]
    }
})
