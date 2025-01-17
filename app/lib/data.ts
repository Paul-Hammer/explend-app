import { endOfDay, formatISO, isWithinInterval } from 'date-fns'

import type { TCategoryData, TChartData, TTransaction } from './types'

export const filterTransactions = (transactions: TTransaction[]) => ({
  income: transactions.filter((t) => t.isIncome),
  expense: transactions.filter((t) => !t.isIncome),
})

export const calculateChartData = (
  income: TTransaction[],
  expense: TTransaction[],
) => {
  const accumulateByCategory = (transactions: TTransaction[]) =>
    transactions.reduce((totals, t) => {
      totals.set(
        t.category,
        (totals.get(t.category) || 0) + parseFloat(t.amount),
      )
      return totals
    }, new Map<string, number>())

  const categoryIncomeTotals = accumulateByCategory(income)
  const categoryExpenseTotals = accumulateByCategory(expense)

  const allCategories = new Set([
    ...categoryIncomeTotals.keys(),
    ...categoryExpenseTotals.keys(),
  ])

  const chartData: TChartData[] = Array.from(allCategories).map((category) => {
    const expense = categoryExpenseTotals.get(category) || 0
    const income = categoryIncomeTotals.get(category) || 0
    return {
      category,
      income,
      expense,
    }
  })

  return chartData
}

export const calculateMonthlyReportData = (
  income: TTransaction[],
  expense: TTransaction[],
) => {
  const calculateTotalAmount = (transactions: TTransaction[]) => {
    return transactions.reduce(
      (total, { amount }) => total + parseFloat(amount),
      0,
    )
  }

  const totalIncome = calculateTotalAmount(income)
  const totalExpense = calculateTotalAmount(expense)

  const totalsByCategory = expense.reduce(
    (totals, { category, amount }) => {
      totals[category] = (totals[category] || 0) + parseFloat(amount)
      return totals
    },
    {} as Record<string, number>,
  )

  const monthlyReportData: TCategoryData[] = Object.entries(
    totalsByCategory,
  ).map(([category, spent]) => {
    let percentage = ((spent / totalExpense) * 100).toFixed(2)
    if (percentage.endsWith('.00')) {
      percentage = percentage.slice(0, -3)
    }

    return {
      category,
      spent,
      percentage,
    }
  })

  return { totalIncome, totalExpense, monthlyReportData }
}

export const filterTransactionsByDateRange = (
  transactions: TTransaction[],
  startDate: Date,
  endDate: Date,
): TTransaction[] => {
  return transactions.filter((transaction) => {
    const transactionDate = formatISO(transaction.createdAt)
    return isWithinInterval(transactionDate, {
      start: startDate,
      end: endOfDay(endDate),
    })
  })
}
