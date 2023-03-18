/* eslint-disable react/no-children-prop */
import {
    Heading,
    Button,
    Flex,
    Box,
    Checkbox,
    Input,
    Text,
    IconButton,
    HStack,
    Grid,
    GridItem,
    VStack,
    Circle,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import {
    BsSortUp,
    BsArrowReturnLeft,
    BsPencil,
    BsSortDown,
    BsTrashFill,
    BsArrowLeft,
    BsArrowUpCircle,
    BsArrowDownCircle,
    BsArrowLeftCircle,
    BsArrowRightCircle,
} from 'react-icons/bs'
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

const filters = ['Show Selected', 'Show Unselected', 'Show All']
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
        if (displayedQuestions.length === 0) setDisplayedQuestions(questions.data)
        filterQuestions(currentFilter)
    }, [questions])

    const closeModal = () => {
        ls.set(FIRST_TIME_VISITOR, 'false')
        setIsOpen(false)
    }

    const generateDefaultQuestions = (): Question[] =>
        defaultQuestions.map((questionText: string) => ({
            id: nanoid(16),
            text: questionText,
            amount: 0,
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
                amount: 0,
            }),
        )
        addInputRef.current.value = ''
    }
    const removeQuestionHandler = (id: string) => {
        dispatch(deleteQuestion(id))
    }
    const changeAmount = (question: Question, amount: number) => {
        dispatch(editQuestion({ ...question, amount: amount }))
    }
    const resetQuestions = () => {
        const resetQuestions = questions.data.map((question: Question) => ({ ...question, amount: 0 }))
        dispatch(editAllQuestions(resetQuestions))
    }
    const editQuestionText = (question: Question, newText: string) => {
        dispatch(editQuestion({ ...question, text: newText }))
    }
    const toggleFilter = () => {
        const nextFilter = currentFilter === 2 ? 0 : currentFilter + 1
        setCurrentFilter(nextFilter)
        filterQuestions(nextFilter)
    }
    const filterQuestions = (filter: number) => {
        const currentQuestions = [...questions.data]
        switch (filter) {
            case 1:
                setDisplayedQuestions(currentQuestions.filter((dQuestion) => dQuestion.amount > 0))
                break
            case 2:
                setDisplayedQuestions(currentQuestions.filter((dQuestion) => dQuestion.amount === 0))
                break
            default:
                setDisplayedQuestions(currentQuestions)
                break
        }
    }
    return (
        <Layout>
            <Grid templateRows="43px min-content minMax(350px, auto)" height="calc(100vh - 1rem)">
                <GridItem>
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
                </GridItem>
                <GridItem>
                    <Flex wrap="wrap" direction="row" pt="2" justifyContent="center" gap="2">
                        <Button leftIcon={<BsSortUp />} variant="outline" onClick={toggleFilter}>
                            {filters[currentFilter]}
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
                </GridItem>
                <GridItem>
                    <Box pt="2" height="100%">
                        <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            p="2"
                            height="100%"
                            overflowY="scroll"
                        >
                            {displayedQuestions.map((question, index) => (
                                <Flex direction="row" justifyContent="space-between" pb="2" key={question.id}>
                                    <Box
                                        display="inline-flex"
                                        w="100%"
                                        borderWidth="1px"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        p="2"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        {editing ? (
                                            <>
                                                <IconButton
                                                    mr="2"
                                                    onClick={() => removeQuestionHandler(question.id)}
                                                    aria-label="Remove question"
                                                    icon={<BsTrashFill />}
                                                />
                                                <Input
                                                    autoFocus={index === 0}
                                                    defaultValue={question.text}
                                                    onBlur={(e) => editQuestionText(question, e.target.value)}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Text>{question.text}</Text>
                                                <Box ml="2">
                                                    <HStack>
                                                        <IconButton
                                                            variant="outline"
                                                            aria-label="Decrease"
                                                            icon={<BsArrowLeftCircle />}
                                                            disabled={question.amount === 0}
                                                            onClick={() => changeAmount(question, question.amount - 1)}
                                                        />
                                                        <Circle borderWidth="1px" size="40px" color="white">
                                                            {question.amount}
                                                        </Circle>
                                                        <IconButton
                                                            colorScheme="red"
                                                            aria-label="Increase"
                                                            icon={<BsArrowRightCircle />}
                                                            onClick={() => changeAmount(question, question.amount + 1)}
                                                        />
                                                    </HStack>
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                </Flex>
                            ))}
                        </Box>
                    </Box>
                </GridItem>
            </Grid>

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
