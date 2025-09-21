'use client';

import { useState, useEffect } from 'react';
import { getOverdueLoans } from '@/services/business';
import { OverdueLoan } from '@/types'; // Import the interface

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusClasses: { [key: string]: string } = { // Add index signature
    'OVERDUE': 'bg-red-500',
    'Follow-up': 'bg-yellow-500',
    'Critical': 'bg-red-500',
    'New': 'bg-green-500',
  };
  return <span className={`px-2 py-1 rounded-full text-xs text-white ${statusClasses[status] || 'bg-gray-500'}`}>{status}</span>;
};

const OverdueLoansTable = () => {
  const [overdueLoanData, setOverdueLoanData] = useState<OverdueLoan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: OverdueLoan[] = await getOverdueLoans();
        setOverdueLoanData(data);
      } catch (error) {
        console.error('Failed to fetch overdue loans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4">Overdue Loans</h2>
      {loading ? (
        <div className="animate-pulse h-64 bg-gray-700 rounded"></div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Customer</th>
              <th>Agent</th>
              <th>Loan #</th>
              <th>Installment</th>
              <th>Days Late</th>
              <th>Arrears</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {overdueLoanData.map((loan, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-2">{loan.customerName}</td>
                <td>{loan.agentName}</td>
                <td>{loan.loanNumber || '-'}</td>
                <td>{`LKR ${loan.installmentAmount.toLocaleString()}`}</td>
                <td>{loan.daysLate}</td>
                <td>{`LKR ${loan.arrears.toLocaleString()}`}</td>
                <td><StatusBadge status={loan.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OverdueLoansTable;