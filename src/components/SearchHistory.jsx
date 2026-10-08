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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Recent Search History</h2>
      {!supabase ? (
        <p>
          Supabase is not configured yet. Add your URL and Key to <code>.env</code> to view search history.
        </p>
      ) : loading ? (
        <p>Loading history…</p>
      ) : history.length === 0 ? (
        <p>No recent searches found.</p>
      ) : (
        <>
          <button onClick={clearHistory} style={{ marginBottom: '15px' }}>
            Clear All History
          </button>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {history.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: '10px 15px',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>
                  <strong>"{item.query}"</strong>
                </span>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}