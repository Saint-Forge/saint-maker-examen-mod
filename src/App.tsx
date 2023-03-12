/* eslint-disable react/no-children-prop */
import { Heading, Button, Flex, Box, Checkbox, Input, Text, IconButton, HStack, Grid, GridItem } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { BsSortUp, BsArrowReturnLeft, BsPencil, BsSortDown, BsTrashFill, BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { nanoid } from '@reduxjs/toolkit'
import { RiSaveLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import { Layout } from '~components/Layout'
import { addQuestion, deleteQuestion, editAllQuestions, editQuestion, getQuestions } from '~slices/questionSlice'
import { AppDispatch, selectQuestions } from '~store'
import { ls } from '~utils/localStorage'
import { AlertModal } from '~components/AlertModal'

import defaultQuestions from './defaultQuestions.json'

const filters = ['Checked', 'Unchecked', 'All']
const FIRST_TIME_VISITOR = 'FIRST_TIME_VISITOR'

export const App = (): JSX.Element => {
    const addInputRef = useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const questions = useSelector(selectQuestions)
    const [editing, setEditing] = useState(false)
    const [currentFilter, setCurrentFilter] = useState(0)
    const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>(questions.data)
    const [isFirstVisit, _setIsFirstVisit] = useState((ls.get(FIRST_TIME_VISITOR) ?? 'true') === 'true')
    const [isOpen, setIsOpen] = useState(isFirstVisit)

    useEffect(() => {
        dispatch(getQuestions())
    }, [])

    useEffect(() => {
        setDisplayedQuestions(questions.data)
    }, [questions])

    const closeModal = () => {
        ls.set(FIRST_TIME_VISITOR, 'false')
        setIsOpen(false)
    }

    const generateDefaultQuestions = (): Question[] =>
        defaultQuestions.map((questionText: string) => ({
            id: nanoid(16),
            text: questionText,
            checked: false,
        }))

    const setDefaultQuestions = () => {
        dispatch(editAllQuestions(generateDefaultQuestions()))
        closeModal()
    }

    const addQuestionHandler = () => {
        if (addInputRef?.current == undefined || addInputRef.current.value.length === 0) return
        dispatch(
            addQuestion({
                id: nanoid(16),
                text: addInputRef.current.value,
                checked: false,
            }),
        )
        addInputRef.current.value = ''
    }
    const removeQuestionHandler = (id: string) => {
        dispatch(deleteQuestion(id))
    }
    const toggleQuestion = (question: Question) => {
        setCurrentFilter(0)
        setDisplayedQuestions(questions.data)
        dispatch(editQuestion({ ...question, checked: !question.checked }))
    }
    const resetQuestions = () => {
        const resetQuestions = questions.data.map((question: Question) => ({ ...question, checked: false }))
        dispatch(editAllQuestions(resetQuestions))
    }
    const editQuestionText = (question: Question, newText: string) => {
        dispatch(editQuestion({ ...question, text: newText }))
    }
    const toggleFilter = () => {
        const nextFilter = currentFilter === 2 ? 0 : currentFilter + 1
        setCurrentFilter(nextFilter)
        const currentQuestions = [...questions.data]
        switch (nextFilter) {
            case 1:
                setDisplayedQuestions(currentQuestions.filter((dQuestion) => dQuestion.checked === true))
                break
            case 2:
                setDisplayedQuestions(currentQuestions.filter((dQuestion) => dQuestion.checked === false))
                break
            default:
                setDisplayedQuestions(currentQuestions)
                break
        }
    }
    return (
        <Layout>
            <HStack justifyContent="space-between">
                <Box flex="1">
                    <IconButton onClick={() => navigate(-1)} aria-label="Menu" icon={<BsArrowLeft />} />
                </Box>
                <Box flex="1" textAlign="center">
                    <Heading as="h1">Examen</Heading>
                </Box>
                <Box flex="1" textAlign="right">
                    {/* Why: placeholder element to maintain spacing */}
                </Box>
            </HStack>

            <Flex wrap="wrap" direction="row" pt="2" justifyContent="center" gap="2">
                <Button leftIcon={<BsSortUp />} variant="outline" onClick={toggleFilter}>
                    View {filters[currentFilter]}
                </Button>
                <Button onClick={resetQuestions} leftIcon={<BsArrowReturnLeft />} variant="outline">
                    Reset
                </Button>
                {editing ? (
                    <Button
                        onClick={() => setEditing(!editing)}
                        leftIcon={<RiSaveLine />}
                        variant="solid"
                        colorScheme="green"
                    >
                        Save
                    </Button>
                ) : (
                    <Button
                        onClick={() => setEditing(!editing)}
                        leftIcon={<BsPencil />}
                        variant={'outline'}
                        colorScheme={'gray'}
                    >
                        Add/Edit Questions
                    </Button>
                )}
            </Flex>
            {editing && (
                <Flex direction="row" pt="2">
                    <Input placeholder="Add a new question" ref={addInputRef} />
                    <IconButton
                        ml="2"
                        onClick={addQuestionHandler}
                        aria-label="Add question"
                        icon={<AiOutlinePlusCircle />}
                    />
                </Flex>
            )}

            <Box pt="2">
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="2" maxHeight="450px" overflowY="scroll">
                    {displayedQuestions.map((question, index) => (
                        <Flex
                            direction="row"
                            justifyContent="center"
                            pb="2"
                            key={question.id}
                            onMouseDown={() => (editing ? undefined : toggleQuestion(question))}
                        >
                            <Box
                                display="inline-flex"
                                w="100%"
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                p="2"
                            >
                                <Checkbox size="lg" mr="2" colorScheme="red" isChecked={question.checked} />
                                {editing ? (
                                    <Input
                                        autoFocus={index === 0}
                                        defaultValue={question.text}
                                        onBlur={(e) => editQuestionText(question, e.target.value)}
                                    />
                                ) : (
                                    <Text>{question.text}</Text>
                                )}
                                {editing && (
                                    <IconButton
                                        ml="2"
                                        onClick={() => removeQuestionHandler(question.id)}
                                        aria-label="Remove question"
                                        icon={<BsTrashFill />}
                                    />
                                )}
                            </Box>
                        </Flex>
                    ))}
                </Box>
            </Box>

            <AlertModal
                isOpen={isOpen}
                onClose={closeModal}
                onConfirm={setDefaultQuestions}
                header="Welcome to the Examen"
                body="This is just a basic examination of conscience application; would you like it to default to the St. Pope Pius X examination or would you prefer to build your own?"
                cancelBtnText="Make my own"
                confirmBtnText="Use default"
            />
        </Layout>
    )
}
