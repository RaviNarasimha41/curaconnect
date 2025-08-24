import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Download, CheckCircle, XCircle, ExternalLink, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { BlockchainRecord } from '../../types';

// Mock data
const mockRecords: BlockchainRecord[] = [
  {
    id: 'REC001',
    patientId: 'PAT001',
    donorId: 'DON001',
    hospitalId: 'HOS001',
    bloodType: 'O+',
    eventType: 'donation',
    date: '2024-01-15',
    notes: 'Regular donation, no complications',
    recordHash: '0xabcd1234567890abcdef1234567890abcdef1234',
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    blockNumber: 18456789,
    status: 'verified',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'REC002',
    patientId: 'PAT002',
    hospitalId: 'HOS002',
    bloodType: 'A-',
    eventType: 'transfusion',
    date: '2024-01-14',
    notes: 'Emergency transfusion',
    recordHash: '0xefgh5678901234cdef5678901234cdef5678901234',
    txHash: '0x5678901234cdef5678901234cdef5678901234cdef5678901234cdef5678901234cd',
    blockNumber: 18456723,
    status: 'verified',
    createdAt: '2024-01-14T15:45:00Z',
  },
];

export function BlockchainRecords() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'records' | 'create'>('records');
  const [showProof, setShowProof] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    patientId: '',
    donorId: '',
    hospitalId: '',
    bloodType: 'O+',
    eventType: 'donation' as 'donation' | 'transfusion',
    date: '',
    notes: '',
  });

  const handleVerify = async (recordId: string) => {
    // Mock verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('✅ Record verified successfully!');
  };

  const handleViewTransaction = (txHash: string) => {
    window.open(`https://polygonscan.com/tx/${txHash}`, '_blank');
  };

  const handleDownloadProof = (record: BlockchainRecord) => {
    const proof = {
      record: {
        id: record.id,
        patientId: record.patientId,
        eventType: record.eventType,
        date: record.date,
        bloodType: record.bloodType,
      },
      sha256: record.recordHash,
      txHash: record.txHash,
      blockNumber: record.blockNumber,
      verified: record.status === 'verified',
      timestamp: record.createdAt,
    };
    
    const blob = new Blob([JSON.stringify(proof, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proof-${record.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock record creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const txHash = '0x' + Math.random().toString(16).slice(2, 66);
    alert(`Record created and anchored to blockchain!\nTransaction Hash: ${txHash}`);
    
    setShowCreateForm(false);
    setNewRecord({
      patientId: '',
      donorId: '',
      hospitalId: '',
      bloodType: 'O+',
      eventType: 'donation',
      date: '',
      notes: '',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Blockchain Records
            </h2>
            <p className="text-sm text-gray-600">
              Immutable patient records secured on Polygon
            </p>
          </div>
        </div>

        {user?.role === 'admin' && (
          <Button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Record</span>
          </Button>
        )}
      </div>

      {/* Sub-tabs */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('records')}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'records'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Patient Records (On-Chain Hashes)
        </button>
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Patient ID
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Record ID
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Type
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockRecords.map((record) => (
              <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-sm text-gray-900">
                  {record.patientId}
                </td>
                <td className="py-3 px-2 text-sm font-mono text-gray-600">
                  {record.id}
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    record.eventType === 'donation'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {record.eventType}
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-gray-600">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-1">
                    {record.status === 'verified' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${
                      record.status === 'verified' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleVerify(record.id)}
                      className="p-1 h-8 w-8"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewTransaction(record.txHash!)}
                      className="p-1 h-8 w-8"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownloadProof(record)}
                      className="p-1 h-8 w-8"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Record Modal */}
      <Modal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        title="Create New Record"
        size="lg"
      >
        <form onSubmit={handleCreateRecord} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Patient ID"
              placeholder="PAT001"
              value={newRecord.patientId}
              onChange={(e) => setNewRecord({ ...newRecord, patientId: e.target.value })}
              required
            />
            
            <Input
              label="Donor ID (Optional)"
              placeholder="DON001"
              value={newRecord.donorId}
              onChange={(e) => setNewRecord({ ...newRecord, donorId: e.target.value })}
            />
            
            <Input
              label="Hospital ID"
              placeholder="HOS001"
              value={newRecord.hospitalId}
              onChange={(e) => setNewRecord({ ...newRecord, hospitalId: e.target.value })}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Type
              </label>
              <select
                value={newRecord.bloodType}
                onChange={(e) => setNewRecord({ ...newRecord, bloodType: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                value={newRecord.eventType}
                onChange={(e) => setNewRecord({ ...newRecord, eventType: e.target.value as 'donation' | 'transfusion' })}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="donation">Donation</option>
                <option value="transfusion">Transfusion</option>
              </select>
            </div>
            
            <Input
              type="date"
              label="Date"
              value={newRecord.date}
              onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              rows={3}
              placeholder="Additional notes..."
              value={newRecord.notes}
              onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              Create & Anchor on Chain
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}