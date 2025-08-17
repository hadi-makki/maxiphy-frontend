# Maxiphy Frontend - Next.js Todo Application

A modern, responsive React application built with Next.js 15, featuring authentication, real-time todo management, and a beautiful user interface.

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **TanStack Query** - Data fetching, caching, and synchronization
- **React Hook Form** - Performant forms with validation
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI components

## 📁 Project Structure

```
maxify-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages group
│   │   │   ├── auth/
│   │   │   │   ├── login/     # Login page
│   │   │   │   └── register/  # Register page
│   │   │   └── layout.tsx     # Auth layout
│   │   ├── (dashboard)/       # Protected pages group
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   └── layout.tsx     # Dashboard layout
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── __tests__/        # Component tests
│   │   │   ├── MButton.test.tsx
│   │   │
│   │   ├── todo/             # Todo-specific components
│   │   │   ├── AddTodoForm.tsx
│   │   │   ├── EditTodoForm.tsx
│   │   │   └── TodoItem.tsx
│   │   ├── ui/               # UI components (Radix-based)
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   └── label.tsx
│   │   ├── MButton.tsx       # Custom button component
│   │   ├── MInput.tsx        # Custom input component
│   │   ├── MLoader.tsx       # Loading spinner
│   │   └── MValidatedInput.tsx # Form-validated input
│   ├── lib/                  # Utilities and configurations
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useAuth.ts   # Authentication hook
│   │   │   └── useTodos.ts  # Todos management hook
│   │   ├── api.ts           # API client configuration
│   │   ├── providers.tsx    # Context providers
│   │   ├── types.ts         # TypeScript type definitions
│   │   └── utils.ts         # Utility functions
│   └── views/               # Page-level components
│       ├── dashboard/
│       ├── login/
│       └── register/
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Backend API running (see backend README)

### Installation & Setup

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be running at `http://localhost:3000`

## ✨ Features

### Core Features

- **User Authentication** - Secure login/register with JWT tokens
- **Todo Management** - Create, read, update, delete todos
- **Priority System** - Low, Medium, High priority levels
- **Real-time Updates** - Optimistic updates with TanStack Query
- **Responsive Design** - Mobile-first, works on all devices

### Advanced Features

- **Search & Filter** - Debounced search with priority filtering
- **Sorting** - Multiple sort options (priority, date, creation time)
- **Pagination** - Efficient handling of large todo lists
- **Pin to Top** - Keep important todos visible
- **Statistics Dashboard** - Overview of todo metrics
- **Completion Toggle** - Switch between completed/pending views
- **Form Validation** - Real-time validation with Zod schemas

## 🧩 Components

### Authentication Components

#### LoginPage

```typescript
// Handles user authentication
- Form validation with Zod
- Error handling and display
- Redirect after successful login
```

#### RegisterPage

```typescript
// User registration functionality
- Email and password validation
- User creation with proper error handling
- Automatic login after registration
```

### Todo Components

#### TodoItem

```typescript
interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

// Features:
- Priority color coding
- Completion toggle
- Pin/unpin functionality
- Edit and delete actions
- Date display with formatting
```

#### AddTodoForm

```typescript
// Modal form for creating new todos
- React Hook Form integration
- Zod validation
- Priority selection
- Date picker
- Optimistic updates
```

#### EditTodoForm

```typescript
// Modal form for editing existing todos
- Pre-populated form fields
- Same validation as create form
- Update functionality
```

### UI Components

#### MButton

```typescript
interface MButtonProps {
  text: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  noBg?: boolean;
  isRounded?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Features:
- Multiple variants and sizes
- Loading states with spinner
- Icon support (start/end)
- Full width option
- Custom styling
```

#### MInput

```typescript
interface MInputProps {
  label?: string;
  inputSize?: "sm" | "md" | "lg";
  isRequired?: boolean;
  description?: string;
  button?: React.ReactNode;
  labelButton?: React.ReactNode;
  rounded?: string;
  border?: string;
  shadow?: string;
  labelClassName?: string;
  className?: string;
}

// Features:
- Multiple sizes
- Label and description support
- Required field indicators
- Embedded buttons
- Custom styling options
```

#### MValidatedInput

```typescript
// React Hook Form integrated input
- Automatic validation display
- Error message handling
- Form state integration
```

## 🔗 Custom Hooks

### useAuth

```typescript
const useAuth = () => {
  // Returns:
  user: User | null;
  login: (credentials) => Promise<void>;
  register: (userData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}
```

### useTodos

```typescript
const useTodos = () => {
  // Returns:
  todos: Todo[];
  addTodo: (todo) => Promise<void>;
  updateTodo: (id, updates) => Promise<void>;
  deleteTodo: (id) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
```

## 🎨 Styling & Design

### Tailwind Configuration

```javascript
// tailwind.config.js
- Custom color palette
- Dark mode support
- Responsive breakpoints
- Animation utilities
```

### Design System

- **Colors** - Consistent color palette
- **Typography** - Hierarchical text styles
- **Spacing** - Uniform spacing scale
- **Shadows** - Subtle depth with shadows
- **Animations** - Smooth transitions and hover effects

### Responsive Design

```css
/* Mobile-first approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

## 🧪 Testing

### Testing Setup

- **Jest** - Testing framework
- **Testing Library** - Component testing utilities
- **jsdom** - DOM environment for testing

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Files

Tests are located in `src/components/__tests__/`:

- `MButton.test.tsx` - Button component tests
- `MInput.test.tsx` - Input component tests (example created)

### Writing Tests

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Component", () => {
  it("should render correctly", () => {
    render(<Component />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

## ⚡ Performance Optimizations

### Data Fetching

- **TanStack Query** - Smart caching and background updates
- **Optimistic Updates** - Immediate UI feedback
- **Debounced Search** - Reduced API calls
- **Pagination** - Load data in chunks

### React Optimizations

- **Memoization** - useMemo and useCallback where needed
- **Code Splitting** - Dynamic imports for large components
- **Image Optimization** - Next.js built-in image optimization

### Bundle Size

```bash
# Analyze bundle size
npm run build
npm run analyze  # if bundle analyzer is configured
```

## 🔒 Security

### Authentication

- **HTTP-only Cookies** - Secure token storage
- **CSRF Protection** - Cross-site request forgery prevention
- **Input Validation** - Client and server-side validation

### Data Protection

- **Sanitization** - Input sanitization
- **XSS Prevention** - Output encoding
- **Type Safety** - TypeScript prevents many runtime errors

## 🚀 Build & Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Deployment Options

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Other Platforms

- **Netlify** - Static site deployment
- **AWS Amplify** - Full-stack deployment
- **Docker** - Containerized deployment

### Environment Variables

```env
# Production environment
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
NODE_ENV=production
```

## 🛠 Development

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Formatting
npm run format
```

### Development Workflow

1. **Feature Branch** - Create feature branches from main
2. **Development** - Develop with hot reloading
3. **Testing** - Write and run tests
4. **Linting** - Ensure code quality
5. **Pull Request** - Submit for review

### Adding New Features

1. **Components** - Add to `src/components/`
2. **Pages** - Add to `src/app/` using App Router
3. **Hooks** - Add custom hooks to `src/lib/hooks/`
4. **Types** - Update `src/lib/types.ts`
5. **Tests** - Add tests in `__tests__` directories

## 📱 Browser Support

- **Modern Browsers** - Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile** - iOS Safari, Chrome Mobile
- **Progressive Enhancement** - Graceful degradation for older browsers

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `jest.config.js` - Jest testing configuration

## 🐛 Troubleshooting

### Common Issues

1. **API Connection** - Check backend is running on correct port
2. **Environment Variables** - Ensure .env.local is configured
3. **Dependencies** - Run `npm install` if modules are missing
4. **TypeScript Errors** - Check type definitions and imports

### Debug Mode

```bash
# Enable debug mode
DEBUG=* npm run dev
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form Docs](https://react-hook-form.com/)

## 🤝 Contributing

1. Follow the existing code patterns
2. Write tests for new components
3. Update documentation
4. Ensure responsive design
5. Test on multiple devices/browsers

---

**Built with ❤️ for Maxiphy Assessment**
