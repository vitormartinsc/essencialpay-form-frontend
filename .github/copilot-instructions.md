# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a TypeScript React form application built with Vite and Material-UI. The project focuses on collecting basic user information through a clean, modern form interface.

## Styling Guidelines
- Use Material-UI components with consistent styling patterns
- Primary color: #0033ff / #0056FF
- Hover color: #0022aa / #003f8a
- Background: #ffffff
- Form containers should have rounded corners (borderRadius: 2 or '15px')
- Input fields should have specific height (56px) and font size (17px)
- Buttons should be full width with custom styling and no text transform

## Form Field Patterns
- Use TextField with fullWidth, margin="normal"
- Apply consistent InputLabelProps styling with blue labels
- Include proper error handling and validation
- Format inputs for CPF, phone, and CEP with specific masks
- Use Container with maxWidth="sm" for responsive layout

## Component Structure
- Create reusable form components
- Implement proper TypeScript interfaces for form data
- Use React hooks for state management
- Include input formatting utilities
- Follow mobile-first responsive design principles

## Code Quality
- Use TypeScript strict mode
- Implement proper error handling
- Follow React best practices
- Use consistent naming conventions
- Include proper JSX accessibility attributes
