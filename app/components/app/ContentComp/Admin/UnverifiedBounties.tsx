import React, {useState} from 'react';
import axios from "axios"
import {toast, Toaster} from "sonner"

type Bounty = {
  name: string;
  imageUrl: string;
  id: number
};
export const runtime = "edge";

type UnverifiedBountiesProps = {
  bounties: Bounty[];
};

const UnverifiedBounties: React.FC<UnverifiedBountiesProps> = ({ bounties }) => {
  const [indexes, setIndexes] = useState<number[]>([]);
  const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;
  return (
    <section className="">
      <h2 className="text-xl font-semibold mb-4">Unverified Bounties</h2>
      {bounties.length === 0 ? (
        <p>No bounties to verify</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-500 p-2">Name</th>
              <th className="border-b border-gray-500 p-2">Endpoint</th>
              <th className="border-b border-gray-500 p-2">URL</th>
              <th className="border-b border-gray-500 p-2">Verify</th>
            </tr>
          </thead>
          <tbody>
            {bounties.map((bounty, index) => {  
              return (
              <tr key={index}>
                <td className="border-b border-gray-700 p-2">{bounty.name}</td>
                <td className="border-b border-gray-700 p-2">/endpoint/something</td>
                <td className="border-b border-gray-700 p-2">{bounty.imageUrl}</td>
                <td className="border-b border-gray-700 p-2">
                  <button  onClick={async () => {
                    const response = await axios.post(`${window.location.origin}/api/app/verifyBounty`, {
                      id: bounty.id
                    }, {
                      withCredentials: true
                    })

                    if (!response.data.success) {
                      toast("Unable to update the user")
                      return
                    }
                    setIndexes(prevData => {
                      return [...prevData, index]
                    })
                    toast("verified")
                  }} className="bg-emerald-400 text-white py-1 px-3 rounded">
                    {indexes.includes(index) ? "Verified" : "Verify"}
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UnverifiedBounties;
