"use client"

import * as React from "react"
import * as Toast from "@radix-ui/react-toast"
import { X } from "lucide-react"

const ToastProvider = Toast.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof Toast.Viewport>,
  React.ComponentPropsWithoutRef<typeof Toast.Viewport>
>(({ className, ...props }, ref) => (
  <Toast.Viewport
    ref={ref}
    className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
    {...props}
  />
))
ToastViewport.displayName = Toast.Viewport.displayName

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof Toast.Root>,
  React.ComponentPropsWithoutRef<typeof Toast.Root> & {
    variant?: "default" | "destructive"
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <Toast.Root
      ref={ref}
      className={`
        group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all
        data-[swipe=cancel]:translate-x-0 
        data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] 
        data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] 
        data-[swipe=move]:transition-none 
        data-[state=open]:animate-in 
        data-[state=closed]:animate-out 
        data-[swipe=end]:animate-out 
        data-[state=closed]:fade-out-80 
        data-[state=closed]:slide-out-to-right-full 
        data-[state=open]:slide-in-from-top-full 
        data-[state=open]:sm:slide-in-from-bottom-full
        ${variant === "default" ? "border bg-white dark:bg-zinc-950 text-black dark:text-white" : ""}
        ${variant === "destructive" ? "border-red-500 bg-red-600 text-white" : ""}
        ${className}
      `}
      {...props}
    />
  )
})
ToastRoot.displayName = Toast.Root.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof Toast.Title>,
  React.ComponentPropsWithoutRef<typeof Toast.Title>
>(({ className, ...props }, ref) => (
  <Toast.Title
    ref={ref}
    className="text-sm font-semibold [&+div]:text-xs"
    {...props}
  />
))
ToastTitle.displayName = Toast.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof Toast.Description>,
  React.ComponentPropsWithoutRef<typeof Toast.Description>
>(({ className, ...props }, ref) => (
  <Toast.Description
    ref={ref}
    className="text-sm opacity-90"
    {...props}
  />
))
ToastDescription.displayName = Toast.Description.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof Toast.Close>,
  React.ComponentPropsWithoutRef<typeof Toast.Close>
>(({ className, ...props }, ref) => (
  <Toast.Close
    ref={ref}
    className={`
      absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity 
      hover:opacity-100 focus:opacity-100 focus:outline-none
      group-hover:opacity-100
      ${className}
    `}
    {...props}
  >
    <X className="h-4 w-4" />
  </Toast.Close>
))
ToastClose.displayName = Toast.Close.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof Toast.Action>,
  React.ComponentPropsWithoutRef<typeof Toast.Action>
>(({ className, ...props }, ref) => (
  <Toast.Action
    ref={ref}
    className={`
      inline-flex h-8 shrink-0 items-center justify-center rounded-md border 
      bg-transparent px-3 text-sm font-medium transition-colors 
      hover:bg-gray-100 dark:hover:bg-zinc-800
      focus:outline-none focus:ring-1 
      disabled:pointer-events-none disabled:opacity-50
      ${className}
    `}
    {...props}
  />
))
ToastAction.displayName = Toast.Action.displayName

type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastRoot>
type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastRootProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  ToastRoot as Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
