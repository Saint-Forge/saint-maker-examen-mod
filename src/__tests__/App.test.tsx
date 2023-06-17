import { configureStore } from '@reduxjs/toolkit'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import localforage from 'localforage'

import * as lsModule from '~utils/localStorage'
import { slices } from '~slices/index'
import { idb } from '~utils/idb'

import { App } from '../App'

const sliceAdd = async (item: any, tableName: string) => {
    const data = (await idb.readData(tableName)) || []
    return idb.writeData(tableName, [item, ...data])
}

const createQuestion = async (item: any, tableName: string) => {
    await sliceAdd(item, tableName)
}

describe('Test App.tsx', () => {
    const storeRef = setupTestStore()
    let mockLsGet

    function setupTestStore() {
        const refObj: any = {}

        beforeEach(() => {
            mockLsGet = vi.spyOn(lsModule.ls, 'get')
            mockLsGet.mockReturnValue('false')
            localforage.clear()
            const store = configureStore({
                reducer: slices,
            })
            refObj.store = store
            refObj.wrapper = function Wrapper({ children }: any) {
                return (
                    <BrowserRouter>
                        <Provider store={store}>{children}</Provider>
                    </BrowserRouter>
                )
            }
        })

        return refObj
    }

    const arrangeComponent = async () => {
        await act(
            async () =>
                await createQuestion(
                    {
                        id: '123',
                        text: 'eating an extra cookie',
                        amount: 0,
                    },
                    'questions',
                ),
        )
        render(<App />, { wrapper: storeRef.wrapper })
    }

    it('Can amends be enabled?', async () => {
        await arrangeComponent()

        await waitFor(() => expect(screen.getByText('Enable Amends')).toBeInTheDocument())
        fireEvent.click(screen.getByText('Enable Amends'))
        await waitFor(() => expect(screen.getByText('Disable Amends')).toBeInTheDocument())
    })

    it('Can amends be viewed?', async () => {
        await arrangeComponent()

        await waitFor(() => expect(screen.getByText('Enable Amends')).toBeInTheDocument())
        fireEvent.click(screen.getByText('Enable Amends'))
        await waitFor(() => expect(screen.getByText('Disable Amends')).toBeInTheDocument())
        await waitFor(() => expect(screen.queryByTestId('sin-0-amends')).not.toBeInTheDocument())

        // select first counter
        await waitFor(() => expect(screen.getByLabelText('sin-0-add')).toBeInTheDocument())
        fireEvent.click(screen.getByLabelText('sin-0-add'))

        // select show selected
        fireEvent.click(screen.getByText('Show Selected'))

        // confirm amends is displayed below selected sin
        await waitFor(() => expect(screen.getByLabelText('sin-0-add')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByTestId('sin-0-amends')).toBeInTheDocument())
    })

    it.only('Can amends be submitted and are saved?', async () => {
        await arrangeComponent()

        await waitFor(() => expect(screen.getByText('Enable Amends')).toBeInTheDocument())
        fireEvent.click(screen.getByText('Enable Amends'))
        await waitFor(() => expect(screen.getByText('Disable Amends')).toBeInTheDocument())

        // select first counter
        await waitFor(() => expect(screen.getByLabelText('sin-0-add')).toBeInTheDocument())
        fireEvent.click(screen.getByLabelText('sin-0-add'))

        // select show selected
        fireEvent.click(screen.getByText('Show Selected'))

        // confirm amends is displayed below selected sin
        await waitFor(() => expect(screen.getByLabelText('sin-0-add')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByTestId('sin-0-amends')).toBeInTheDocument())

        // enter in amends for sin and confirm it shows up
        const amendText = 'should not have done that'
        fireEvent.change(screen.getByTestId('sin-0-amends'), { target: { value: amendText } })
        fireEvent.blur(screen.getByTestId('sin-0-amends'))
        await waitFor(() => expect(screen.getByTestId('sin-0-amends')).toHaveValue(amendText))

        fireEvent.click(screen.getByText('Show Unselected'))
        fireEvent.click(screen.getByText('Show All'))
        fireEvent.click(screen.getByText('Show Selected'))

        await waitFor(() => expect(screen.getByTestId('sin-0-amends')).toHaveValue(amendText))
    })
})
