import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import TodoList from '../container/TodoList'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/todoApp/design' element={<TodoList/>}/>
            <Route path='*' element={<Navigate to={'/todoApp/design'} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter