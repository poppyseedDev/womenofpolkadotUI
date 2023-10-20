import { ContractIds } from '@deployments/deployments'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { contractTxWithToast } from '@utils/contractTxWithToast'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type UpdateGreetingValues = { newMessage: string }

export const GreeterContractInteractions: FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Collection)
  const [greeterMessage, setGreeterMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>()
  const { register, reset, handleSubmit } = useForm<UpdateGreetingValues>()

  // Fetch Greeting
  const fetchGreeting = async () => {
    if (!contract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'greet')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'greet')
      if (isError) throw new Error(decodedOutput)
      setGreeterMessage(output)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching greeting. Try again…')
      setGreeterMessage(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGreeting()
  }, [contract])

  // Update Greeting
  const updateGreeting = async ({ newMessage }: UpdateGreetingValues) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    // Send transaction
    setUpdateIsLoading(true)
    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'setMessage', {}, [
        newMessage,
      ])
      reset()
    } catch (e) {
      console.error(e)
    } finally {
      setUpdateIsLoading(false)
      fetchGreeting()
    }
  }

  if (!api) return null

  return (
    <>
      <div className="flex grow flex-col space-y-4 max-w-[20rem]">
        <h2 className="text-center font-mono text-gray-400">Greeter Smart Contract</h2>

        {/* Fetched Greeting */}
        <div className="p-4 border border-gray-300 rounded bg-white dark:bg-gray-800">
          <div className="mb-2 font-bold">Fetched Greeting</div>
          <input
            type="text"
            placeholder={fetchIsLoading || !contract ? 'Loading…' : greeterMessage}
            disabled
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Update Greeting */}
        <div className="p-4 border border-gray-300 rounded bg-white dark:bg-gray-800">
          <form onSubmit={handleSubmit(updateGreeting)}>
            <div className="flex items-end space-x-2">
              <div className="flex-grow">
                <label className="block mb-1 font-bold">Update Greeting</label>
                <input
                  type="text"
                  disabled={updateIsLoading}
                  {...register('newMessage')}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className={`px-4 py-2 bg-purple-600 text-white rounded ${updateIsLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
                disabled={updateIsLoading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Contract Address */}
        <p className="text-center font-mono text-xs text-gray-600">
          {contract ? contractAddress : 'Loading…'}
        </p>
      </div>
    </>
  )
}
