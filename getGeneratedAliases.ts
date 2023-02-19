import path from 'path'
import config from './tsconfig.json'

interface IAllPaths {
    [key: string]: string[]
}

interface IGeneratedAliases {
    [key: string]: string
}

export const getGeneratedAliases = () => {
    const allPaths: IAllPaths = config?.compilerOptions?.paths || {}
    const defaultPath = './src/'
    const generatedAliases: IGeneratedAliases = {}
    Object.entries(allPaths).map((aliasPath: [string, string[]]) => {
        generatedAliases[aliasPath[0].replaceAll('/*', '')] = path.resolve(
            __dirname,
            `${defaultPath}${aliasPath[1][0].replaceAll('/*', '')}`,
        )
    })
    return generatedAliases
}
