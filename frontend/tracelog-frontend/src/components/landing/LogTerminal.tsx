'use client'

const logLines = [
  { time: '14:02:11.402', level: 'INFO', levelColor: '#A1A1AA', msg: 'rule qps_spike matched → routed to pagerduty' },
  { time: '14:02:11.440', level: 'INFO', levelColor: '#A1A1AA', msg: 'checkpoint flushed wal_size=64MB duration=118ms' },
  { time: '14:02:11.478', level: 'ERROR', levelColor: '#EF4444', msg: 'deadlock detected tx_id=99213 table=inventory' },
  { time: '14:02:11.204', level: 'INFO', levelColor: '#A1A1AA', msg: 'connection pool acquired conn_id=8841 db=postgres-prod' },
  { time: '14:02:11.219', level: 'WARN', levelColor: '#F59E0B', msg: 'slow query 812ms SELECT * FROM orders WHERE status=?' },
  { time: '14:02:11.240', level: 'INFO', levelColor: '#A1A1AA', msg: 'replica lag 0.2s cluster=us-east-1 node=replica-02' },
  { time: '14:02:11.266', level: 'ERROR', levelColor: '#EF4444', msg: 'ETIMEDOUT writing to redis cache-eu-west-1:6379' },
  { time: '14:02:11.301', level: 'INFO', levelColor: '#A1A1AA', msg: 'index scan idx_created_at complete rows=48213' },
  { time: '14:02:11.330', level: 'INFO', levelColor: '#A1A1AA', msg: 'mongo bulkWrite acked n=512 collection=events' },
  { time: '14:02:11.355', level: 'WARN', levelColor: '#F59E0B', msg: 'connection pool at 82% capacity pool=prod-write' },
]

const dbSources = [
  { name: 'postgres-prod', color: '#3B82F6', count: 482 },
  { name: 'mongo-cluster', color: '#10B981', count: 310 },
  { name: 'redis-cache', color: '#EF4444', count: 891 },
  { name: 'postgres-replica', color: '#6366F1', count: 112 },
  { name: 'mongo-analytics', color: '#10B981', count: 67 },
]

export default function LogTerminal() {
  const doubled = [...logLines, ...logLines]

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto 80px', padding: '0 48px' }}>
      <style>{`
        @keyframes logScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>

      <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', boxShadow: '0 60px 120px -30px rgba(254,82,3,0.12)', overflow: 'hidden' }}>

        {/* CLI TITLE */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid #1A1A1A' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#52525B' }}>
            tracelog · production-cluster-us-east-1
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'block' }}></span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#10B981' }}>1,204 hosts</span>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ display: 'flex' }}>

          {/* LEFT - DB LIST */}
          <div style={{ width: '200px', flexShrink: 0, borderRight: '1px solid #1A1A1A', padding: '12px 0' }}>
            {dbSources.map((db) => (
              <div key={db.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: db.color, display: 'block', flexShrink: 0 }}></span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#A1A1AA' }}>{db.name}</span>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#52525B' }}>{db.count}</span>
              </div>
            ))}
          </div>

          {/* RIGHT - LOG STREAM */}
          <div style={{ flex: 1, height: '320px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ animation: 'logScroll 18s linear infinite' }}>
              {doubled.map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '12px', padding: '7px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#3F3F46', flexShrink: 0 }}>{line.time}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: line.levelColor, fontWeight: 700, flexShrink: 0, width: '40px' }}>{line.level}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#71717A', whiteSpace: 'nowrap' }}>{line.msg}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
