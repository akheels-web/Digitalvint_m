import React, {useEffect, useState} from 'react'
import {Card, Text, Flex, Grid, Stack, Label, Heading, Badge} from '@sanity/ui'
import {useClient} from 'sanity'
import {UserIcon, CheckmarkCircleIcon, WarningOutlineIcon, DashboardIcon} from '@sanity/icons'

export function LeadStatsWidget() {
  const client = useClient({apiVersion: '2023-01-01'})
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    won: 0,
    latestLeads: [],
  })

  useEffect(() => {
    const fetchStats = async () => {
      const query = `{
        "total": count(*[_type == "lead"]),
        "new": count(*[_type == "lead" && status == "new"]),
        "contacted": count(*[_type == "lead" && status == "contacted"]),
        "won": count(*[_type == "lead" && status == "won"]),
        "latest": *[_type == "lead"] | order(_createdAt desc)[0...5] {
          _id,
          name,
          service,
          status,
          _createdAt
        }
      }`
      const result = await client.fetch(query)
      setStats({
        total: result.total,
        new: result.new,
        contacted: result.contacted,
        won: result.won,
        latestLeads: result.latest,
      })
    }

    fetchStats()
    // Subscribe to changes for real-time updates
    const subscription = client.observable
      .listen('*[_type == "lead"]')
      .subscribe(fetchStats)

    return () => subscription.unsubscribe()
  }, [client])

  return (
    <Card padding={4} radius={3} shadow={1} border>
      <Stack space={4}>
        <Flex align="center" gap={2}>
          <DashboardIcon style={{fontSize: 24, color: '#3b82f6'}} />
          <Heading size={2}>Lead Intelligence</Heading>
        </Flex>

        <Grid columns={[2, 2, 4]} gap={3}>
          <Card padding={3} radius={2} tone="primary" border>
            <Stack space={2}>
              <Label muted size={1}>Total Leads</Label>
              <Text size={4} weight="bold">{stats.total}</Text>
            </Stack>
          </Card>
          <Card padding={3} radius={2} tone="caution" border>
            <Stack space={2}>
              <Label muted size={1}>New</Label>
              <Text size={4} weight="bold">{stats.new}</Text>
            </Stack>
          </Card>
          <Card padding={3} radius={2} tone="positive" border>
            <Stack space={2}>
              <Label muted size={1}>Closed (Won)</Label>
              <Text size={4} weight="bold">{stats.won}</Text>
            </Stack>
          </Card>
          <Card padding={3} radius={2} tone="default" border>
            <Stack space={2}>
              <Label muted size={1}>Conversion</Label>
              <Text size={4} weight="bold">
                {stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0}%
              </Text>
            </Stack>
          </Card>
        </Grid>

        <Stack space={3} style={{marginTop: '10px'}}>
          <Label muted>Latest Prospects</Label>
          <Stack space={2}>
            {stats.latestLeads.map((lead: any) => (
              <Card key={lead._id} padding={3} radius={2} border shadow={0}>
                <Flex justify="space-between" align="center">
                  <Stack space={2}>
                    <Text weight="bold" size={1}>{lead.name}</Text>
                    <Text size={1} muted>{lead.service || 'General Enquiry'}</Text>
                  </Stack>
                  <Badge tone={lead.status === 'won' ? 'positive' : lead.status === 'new' ? 'caution' : 'default'}>
                    {lead.status || 'New'}
                  </Badge>
                </Flex>
              </Card>
            ))}
            {stats.latestLeads.length === 0 && (
              <Text muted size={1} align="center">No leads captured yet.</Text>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}
