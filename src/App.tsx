/* eslint-disable react/no-children-prop */
import { Heading, Button, Flex, Box, Checkbox, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useState } from 'react'
import { BsSortUp, BsArrowReturnLeft, BsPencil } from 'react-icons/bs'

import { Layout } from '~components/Layout'

interface IQuestion {
    text: string
    checked: boolean
}

export const App = (): JSX.Element => {
    const [sorted, setSorted] = useState(false)
    const [questions, setQuestions] = useState<IQuestion[]>([
        {
            text: 'Did I fail to pay attention as Mass',
            checked: false,
        },
        {
            text: 'Did I steal from my neighbor',
            checked: true,
        },
    ])
    const toggleQuestion = (toggleIndex: number) => {
        setQuestions(
            questions.map((question, index) => {
                question.checked = toggleIndex === index ? !question.checked : question.checked
                return question
            }),
        )
    }
    const sortQuestions = () => {
        if (sorted) {
            setSorted(false)
            setQuestions((currentQuestions) => currentQuestions.sort((question) => (question.checked ? 1 : -1)))
        } else {
            setSorted(true)
            setQuestions((currentQuestions) => currentQuestions.sort((question) => (question.checked ? -1 : 1)))
        }
    }
    return (
        <Layout>
            <Heading as="h1" textAlign="center" py="4" size="2xl">
                Examen
            </Heading>
            <Flex direction="row" pt="2" justifyContent="center" gap="2">
                <Button leftIcon={<BsSortUp />} variant="outline" onClick={sortQuestions}>
                    Sort
                </Button>
                <Button leftIcon={<BsArrowReturnLeft />} variant="outline">
                    Reset
                </Button>
                <Button leftIcon={<BsPencil />} variant="outline">
                    Edit
                </Button>
            </Flex>
            <Box pt="2">
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="2">
                    {questions.map((question, index) => (
                        <Flex
                            direction="row"
                            justifyContent="center"
                            pb="2"
                            key={index}
                            onMouseDown={() => toggleQuestion(index)}
                        >
                            <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" p="2">
                                <Checkbox size="lg" mr="2" colorScheme="orange" isChecked={question.checked}>
                                    {question.text}
                                </Checkbox>
                            </Box>
                        </Flex>
                    ))}
                </Box>
            </Box>
        </Layout>
    )
}
