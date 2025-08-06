'use client'

import { useState } from 'react'
import {
  DndContext, closestCenter, 
  MouseSensor, TouchSensor, useSensor, useSensors
} from '@dnd-kit/core'
import {
  arrayMove, SortableContext, verticalListSortingStrategy
} from '@dnd-kit/sortable'
import dynamic from 'next/dynamic'

import { RevenueChart, ServiceBreakdownChart, PerformanceMetricsChart, FinancialOverviewChart } from '@/components/dashboard/chart-widgets'

const availableWidgets = [
  { id: 'revenue', label: 'Revenue Chart', component: RevenueChart },
  { id: 'breakdown', label: 'Service Breakdown', component: ServiceBreakdownChart },
  { id: 'performance', label: 'Performance Metrics', component: PerformanceMetricsChart },
  { id: 'financial', label: 'Financial Overview', component: FinancialOverviewChart },
]

export function WidgetArea() {
  const [widgetOrder, setWidgetOrder] = useState<string[]>(availableWidgets.map(w => w.id))
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setWidgetOrder(items => arrayMove(items, items.indexOf(active.id), items.indexOf(over.id)))
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={widgetOrder} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {widgetOrder.map(id => {
            const w = availableWidgets.find(w => w.id === id)!
            const Comp = w.component
            return (
              <div key={w.id} className="rounded-lg outline-dashed outline-2 outline-gray-200">
                <Comp />
              </div>
            )
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}
