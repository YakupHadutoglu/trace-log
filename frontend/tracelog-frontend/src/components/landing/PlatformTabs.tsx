'use client'

import { useState } from 'react'

const logLines = [
  { time: '14:02:11.402', level: 'INFO', levelColor: '#A1A1AA', msg: 'rule qps_spike matched → routed to pagerduty' },
  { time: '14:02:11.440', level: 'INFO', levelColor: '#A1A1AA', msg: 'checkpoint flushed wal_size=64MB duration=118ms' },
  { time: '14:02:11.478', level: 'ERROR', levelColor: '#EF4444', msg: 'deadlock detected tx_id=99213 table=inventory' },
  { time: '14:02:11.204', level: 'INFO', levelColor: '#A1A1AA', msg: 'connection pool acquired conn_id=8841 db=postgres-prod' },
  { time: '14:02:11.219', level: 'WARN', levelColor: '#F59E0B', msg: 'slow query 812ms SELECT * FROM orders WHERE status=?' },
  { time: '14:02:11.240', level: 'INFO', levelColor: '#A1A1AA', msg: 'replica lag 0.2s cluster=us-east-1 node=replica-02' },
]

const metricBars = [
  { label: '09:00', height: '64%' },
  { label: '10:00', height: '82%' },
  { label: '11:00', height: '58%' },
  { label: '12:00', height: '96%' },
  { label: '13:00', height: '74%' },
  { label: '14:00', height: '88%' },
  { label: '15:00', height: '62%' },
  { label: '16:00', height: '70%' },
]

const alertRules = [
  { color: '#EF4444', name: 'high_error_rate', condition: 'error_rate > 2% over 5m window', channel: 'PagerDuty', enabled: true },
  { color: '#F59E0B', name: 'p95_latency', condition: 'p95 latency > 500ms for 3 checks', channel: 'Slack', enabled: true },
  { color: '#F59E0B', name: 'replication_lag', condition: 'replication_lag > 5s on any replica', channel: 'Slack', enabled: false },
  { color: '#EF4444', name: 'pool_exhaustion', condition: 'active_connections >= pool_max for 60s', channel: 'PagerDuty', enabled: true },
]

export default function PlatformTabs() {
  const [activeTab, setActiveTab] = useState(0)
  const [rules, setRules] = useState(alertRules)

  const toggleRule = (i: number) => {
    setRules(prev => prev.map((r, idx) => idx === i ? { ...r, enabled: !r.enabled } : r))
  }

  const tabBtn = (i: number) => ({
    padding: '9px 20px',
    borderRadius: '7px',
    border: 'none',
    fontSize: '13.5px',
    fontWeight: 600,
    cursor: 'pointer',
    background: activeTab === i ? '#FE5203' : 'transparent',
    color: activeTab === i ? '#FFFFFE' : '#71717A',
  } as React.CSSProperties)

  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 48px 32px', position: 'relative', zIndex: 1 }}>

      {/* TİTLE */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#FE5203', fontWeight: 600, letterSpacing: '0.5px' }}>PLATFORM</span>
        <h2 style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-1.8px', margin: '12px 0 0', color: '#FFFFFF' }}>See it in action.</h2>
      </div>

      {/* TAB BUTTONS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '28px', border: '1px solid #27272A', borderRadius: '10px', padding: '4px', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto', background: '#0A0A0A' }}>
        <button style={tabBtn(0)} onClick={() => setActiveTab(0)}>Logs</button>
        <button style={tabBtn(1)} onClick={() => setActiveTab(1)}>Metrics</button>
        <button style={tabBtn(2)} onClick={() => setActiveTab(2)}>Alerts</button>
      </div>

      {/* CONTENT */}
      <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', overflow: 'hidden', minHeight: '380px' }}>

        {/* LOGS TAB */}
        {activeTab === 0 && (
          <div style={{ padding: '28px 32px' }}>
            {logLines.map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', padding: '9px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', borderBottom: '1px solid #141414' }}>
                <span style={{ color: '#525258', whiteSpace: 'nowrap' }}>{line.time}</span>
                <span style={{ color: line.levelColor, fontWeight: 700, width: '48px', flexShrink: 0 }}>{line.level}</span>
                <span style={{ color: '#D4D4D8' }}>{line.msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* METRICS TAB */}
        {activeTab === 1 && (
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: '16px', height: '220px', padding: '0 8px' }}>
              {metricBars.map((bar, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', flex: 1, height: '100%' }}>
                  <div style={{ width: '100%', maxWidth: '36px', background: 'linear-gradient(180deg, #FE5203, #7a2800)', borderRadius: '4px 4px 0 0', height: bar.height }}></div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', color: '#525258' }}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALERTS TAB */}
        {activeTab === 2 && (
          <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {rules.map((rule, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: '1px solid #141414' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: rule.color, flexShrink: 0, display: 'block' }}></span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#FFFFFE', width: '220px', flexShrink: 0 }}>{rule.name}</span>
                <span style={{ fontSize: '13px', color: '#A1A1AA', flex: 1 }}>{rule.condition}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#A1A1AA', border: '1px solid #27272A', borderRadius: '5px', padding: '3px 8px' }}>{rule.channel}</span>
                <div onClick={() => toggleRule(i)} style={{ width: '36px', height: '20px', borderRadius: '20px', background: rule.enabled ? '#FE5203' : '#27272A', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#FFFFFE', position: 'absolute', top: '2px', left: rule.enabled ? '18px' : '2px', transition: 'left 160ms ease' }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
