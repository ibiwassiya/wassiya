'use client'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const cases = [
  { client: 'Nadia Akhtar', type: 'Essentials', completed: '13 May 2025', fee: '£499'   },
  { client: 'Sarah Ahmed',  type: 'Family',     completed: '10 May 2025', fee: '£1,200' },
  { client: 'Yusuf Khan',   type: 'Essentials', completed: '8 May 2025',  fee: '£499'   },
  { client: 'Amina Patel',  type: 'Complex',    completed: '5 May 2025',  fee: '£2,800' },
]

export default function CompletedCases() {
  return (
    <div className="psec active">
      <div className="psect">Completed cases this month</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map(c => (
            <TableRow key={c.client}>
              <TableCell className="font-medium">{c.client}</TableCell>
              <TableCell>{c.type}</TableCell>
              <TableCell style={{ color: 'var(--ink3)' }}>{c.completed}</TableCell>
              <TableCell>{c.fee}</TableCell>
              <TableCell>
                <Badge variant="outline" style={{ background: 'var(--gl)', color: 'var(--gd)', borderColor: 'transparent' }}>
                  Delivered
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
