'use client';

import { useState, useEffect } from 'react';
import { getAgentPerformance } from '@/services/business';
import { AgentPerformance } from '@/types'; // Import the interface

const AgentPerformanceTable = () => {
  const [agentData, setAgentData] = useState<AgentPerformance[]>([]); // Apply the type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: AgentPerformance[] = await getAgentPerformance(); // Apply the type
        setAgentData(data);
      } catch (error) {
        console.error('Failed to fetch agent performance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4">Agent Performance</h2>
      {loading ? (
        <div className="animate-pulse h-64 bg-gray-700 rounded"></div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Agent</th>
              <th>Customers</th>
              <th>Disbursed</th>
              <th>Collected</th>
              <th>Outstanding</th>
              <th>Overdue</th>
              <th>Recovery %</th>
            </tr>
          </thead>
          <tbody>
            {agentData.map((agent, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-2">{agent.agentName}</td>
                <td>{agent.customerCount}</td>
                <td>{`LKR ${agent.disbursedAmount.toLocaleString()}`}</td>
                <td>{`LKR ${agent.collectedAmount.toLocaleString()}`}</td>
                <td>{`LKR ${agent.outstandingAmount.toLocaleString()}`}</td>
                <td>{agent.overdueCount}</td>
                <td>{`${agent.recoveryRate}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AgentPerformanceTable;
