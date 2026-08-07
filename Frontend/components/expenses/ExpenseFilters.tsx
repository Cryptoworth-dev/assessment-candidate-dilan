"use client"

import { ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExpenseFiltersProps {
  search: string
  category: string
  sortBy: string
  sortOrder: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onSortByChange: (value: string) => void
  onSortOrderChange: (value: string) => void
}

const categories = ["", "Food", "Transport", "Rent", "Shopping", "Entertainment", "Utilities", "Health", "Education", "Business", "Finance", "Personal", "Other"]

export default function ExpenseFilters({
  search,
  category,
  sortBy,
  sortOrder,
  onSearchChange,
  onCategoryChange,
  onSortByChange,
  onSortOrderChange,
}: ExpenseFiltersProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onSearchChange(event.target.value)}
          placeholder="Search expenses"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={(value) => onCategoryChange(value)}>
          <SelectTrigger id="category">
            <SelectValue placeholder="All categories" value={category || undefined} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((value) => (
              <SelectItem key={value || "all"} value={value}>
                {value || "All categories"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sortBy">Sort by</Label>
        <Select onValueChange={(value) => onSortByChange(value)}>
          <SelectTrigger id="sortBy">
            <SelectValue placeholder="Date" value={sortBy || undefined} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="description">Description</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sortOrder">Order</Label>
        <Select onValueChange={(value) => onSortOrderChange(value)}>
          <SelectTrigger id="sortOrder">
            <SelectValue placeholder="Descending" value={sortOrder || undefined} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Descending</SelectItem>
            <SelectItem value="asc">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
