import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { idb } from '~utils/idb'

export const getQuestions = createAsyncThunk('questions/getQuestions', async () => {
    return idb.readData('questions')
})
export const addQuestion = createAsyncThunk('questions/addQuestion', async (questions: Question) => {
    const data = (await idb.readData('questions')) || []
    return idb.writeData('questions', [questions, ...data])
})
export const editQuestion = createAsyncThunk('questions/editQuestion', async (editedQuestion: Question) => {
    const data = (await idb.readData('questions')) || []
    const updatedQuestions = data.map((questions) => {
        if ((questions as Question).id === editedQuestion.id) return editedQuestion
        return questions
    })
    return idb.writeData('questions', updatedQuestions)
})
export const editAllQuestions = createAsyncThunk('questions/editQuestions', async (updatedQuestions: Question[]) => {
    return idb.writeData('questions', updatedQuestions)
})
export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (id: string) => {
    const data = (await idb.readData('questions')) || []
    return idb.writeData(
        'questions',
        data.filter((questions) => (questions as Question).id !== id),
    )
})

const initialState = {
    data: [] as Question[],
    loading: true,
}

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: {
        [getQuestions.pending.type]: (state) => {
            state.loading = true
        },
        [getQuestions.fulfilled.type]: (state, action) => {
            state.data = action.payload || ([] as Question[])
            state.loading = false
        },
        [addQuestion.fulfilled.type]: (state, action) => {
            state.data = action.payload as Question[]
        },
        [editQuestion.fulfilled.type]: (state, action) => {
            state.data = action.payload as Question[]
        },
        [editAllQuestions.fulfilled.type]: (state, action) => {
            state.data = action.payload as Question[]
        },
        [deleteQuestion.fulfilled.type]: (state, action) => {
            state.data = action.payload as Question[]
        },
    },
})

export const { reducer } = questionsSlice
