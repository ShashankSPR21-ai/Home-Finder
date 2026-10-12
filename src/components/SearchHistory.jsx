import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SearchHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  async function fetchHistory() {
    if (!supabase) {
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('search_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Error fetching search history:', error.message)
    } else {
      setHistory(data || [])
    }
    setLoading(false)
  }

  async function clearHistory() {
    if (!supabase) return
    const { error } = await supabase
      .from('search_history')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    if (!error) setHistory([])
  }

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main, #0f172a)', margin: 0 }}>Recent Search History</h2>
        {supabase && !loading && history.length > 0 && (
          <button 
            onClick={clearHistory} 
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem', background: '#fee2e2', color: '#991b1b', fontWeight: '600', borderRadius: '0.5rem', border: '1px solid #fecaca', cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '0.875rem' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fecaca'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Clear All History
          </button>
        )}
      </div>

      <div style={{ background: 'var(--card-bg, #ffffff)', borderRadius: '1rem', border: '1px solid var(--border-color, #e2e8f0)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)', overflow: 'hidden', padding: '0.5rem' }}>
        {!supabase ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted, #64748b)', margin: 0 }}>
            Supabase is not configured yet. Add your URL and Key to <code>.env</code> to view search history.
          </p>
        ) : loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted, #64748b)', margin: 0 }}>Loading history…</p>
        ) : history.length === 0 ? (
          <p style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted, #64748b)', margin: 0 }}>No recent searches found.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {history.map((item, index) => (
              <li
                key={item.id}
                style={{
                  padding: '1rem 1.25rem',
                  borderBottom: index !== history.length - 1 ? '1px solid var(--border-color, #f1f5f9)' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background 0.2s ease',
                  borderRadius: '0.5rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary, #f8fafc)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ color: 'var(--text-main, #1e293b)' }}>
                  <strong>"{item.query}"</strong>
                </span>
                <span style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.85rem' }}>
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}