import { Heading } from '@chakra-ui/react'

import { Layout } from '~components/Layout'

export const App = (): JSX.Element => {
    return (
        <Layout>
            <Heading as="h1" textAlign="center" py="4" size="2xl">
                Saint Maker Mod Template
            </Heading>
        </Layout>
    )
}
