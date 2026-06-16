import { useAuth } from '@/hooks/useAuth';
import {
  CheckCircle2,
  ArrowRight,
  Server,
  Zap,
  Users,
  Clock,
  CreditCard,
  Code2,
  LayoutTemplate,
} from 'lucide-react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

// --- UI Components (Simulating Shadcn/ui) ---

const Button = ({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-900/90 shadow-sm',
    secondary:
      'bg-white text-slate-900 border border-slate-200 hover:bg-slate-100 shadow-sm',
    ghost: 'hover:bg-slate-100 text-slate-700',
    link: 'text-slate-900 underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-12 rounded-md px-8 text-lg',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-slate-900 ${className}`}
  >
    {children}
  </span>
);

const Card = ({ title, description, icon: Icon, className = '' }) => (
  <div
    className={`rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
  >
    <div className='p-6 flex flex-col items-start gap-4'>
      <div className='p-2 bg-slate-100 rounded-md text-slate-900'>
        <Icon size={24} />
      </div>
      <div className='space-y-1'>
        <h3 className='text-xl font-semibold tracking-tight'>{title}</h3>
        <p className='text-sm text-slate-500 leading-relaxed'>{description}</p>
      </div>
    </div>
  </div>
);

const TechItem = ({ label, description, items }) => (
  <div className='flex flex-col space-y-3 p-4 rounded-lg bg-slate-50 border border-slate-200/60'>
    <div className='flex items-center gap-2'>
      <div className='h-2 w-2 rounded-full bg-blue-500' />
      <span className='font-semibold text-slate-800'>{label}</span>
    </div>
    <p className='text-xs text-slate-500'>{description}</p>
    <div className='flex flex-wrap gap-2 mt-2'>
      {items.map((item) => (
        <code
          key={item}
          className='relative rounded bg-white px-[0.5rem] py-[0.2rem] font-mono text-xs font-semibold text-slate-700 border border-slate-200'
        >
          {item}
        </code>
      ))}
    </div>
  </div>
);

// --- Main Page Component ---

export default function LandingPage() {
  const navigation = useNavigate();

  const handleLoginRedirect = () => {
    // In a real app: window.location.href = '/login';
    // alert('Redirecting to Login...');
    navigation('/signin');
  };

  const handleDemoRedirect = () => {
    // In a real app: window.location.href = '/login?demo=true';
    alert('Redirecting to Live Demo (Demo User)...');
  };

  return (
    <div className='min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-100'>
      {/* Navigation */}
      <nav className='sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm'>
        <div className='container mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-2 font-bold text-xl tracking-tight'>
            <div className='bg-slate-900 text-white p-1 rounded'>
              <LayoutTemplate size={18} />
            </div>
            Paymaster Control
          </div>
          <div className='flex items-center gap-4'>
            <a
              href='#'
              className='text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block'
            >
              Documentation
            </a>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleLoginRedirect}
              className='hidden sm:inline-flex'
            >
              Log in
            </Button>
            <Button variant='primary' size='sm' onClick={handleDemoRedirect}>
              Live Demo
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden'>
        <div className='absolute inset-0 -z-10 h-full w-full bg-white [background-image:linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [background-size:14px_24px]'></div>

        <div className='container mx-auto max-w-4xl px-4 md:px-6 text-center'>
          <Badge className='mb-6 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors cursor-default'>
            v1.0.0 Now Available
          </Badge>

          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6'>
            Complete Control over <br className='hidden md:block' />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900'>
              Resources, Time & Billing
            </span>
          </h1>

          <p className='text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed'>
            The open-source inspired PSA platform built for modern professional
            services. Manage your team, track billable hours, and invoice
            clients with precision.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Button
              variant='primary'
              size='lg'
              className='w-full sm:w-auto shadow-xl shadow-slate-200'
              onClick={handleDemoRedirect}
            >
              <Zap className='mr-2 h-4 w-4 fill-yellow-400 text-yellow-400' />
              Try Live Demo
            </Button>
            <Button
              variant='secondary'
              size='lg'
              className='w-full sm:w-auto'
              onClick={() =>
                window.open(
                  'https://github.com/rodrigogollo/paymaster-control',
                  '_blank'
                )
              }
            >
              <Code2 className='mr-2 h-4 w-4' />
              View on GitHub
            </Button>
          </div>

          <div className='mt-12 flex items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-500 flex-wrap'>
            <span className='flex items-center gap-1'>
              <CheckCircle2 className='h-4 w-4 text-green-500' /> No credit card
              required
            </span>
            <span className='flex items-center gap-1'>
              <CheckCircle2 className='h-4 w-4 text-green-500' /> Instant setup
            </span>
            <span className='flex items-center gap-1'>
              <CheckCircle2 className='h-4 w-4 text-green-500' /> Open Source
            </span>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className='py-24 bg-slate-50 border-y border-slate-200'>
        <div className='container mx-auto max-w-6xl px-4 md:px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold tracking-tight mb-4'>
              Everything you need to run your firm
            </h2>
            <p className='text-slate-500 max-w-2xl mx-auto'>
              Paymaster Control replaces your fragmented toolset with a single,
              cohesive source of truth.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <Card
              title='Resource Management'
              icon={Users}
              description='Visualize team availability, assign projects based on skills, and prevent burnout with intelligent capacity planning tools.'
            />
            <Card
              title='Time Tracking'
              icon={Clock}
              description='Frictionless time entry for your team. Track billable vs. non-billable hours with precision to ensure profitability.'
            />
            <Card
              title='Billing & Invoicing'
              icon={CreditCard}
              description='Automate your billing cycle. Generate professional invoices from timesheets and expenses in seconds, not days.'
            />
          </div>
        </div>
      </section>

      {/* Tech Stack (The "PocketBase" Vibe) */}
      <section className='py-24 bg-white'>
        <div className='container mx-auto max-w-5xl px-4 md:px-6'>
          <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4'>
            <div>
              <h2 className='text-3xl font-bold tracking-tight mb-2'>
                Built for Performance
              </h2>
              <p className='text-slate-500'>
                A modern stack designed for speed, type-safety, and reliability.
              </p>
            </div>
            <div className='flex gap-2'>
              <Badge className='bg-slate-100'>TypeScript</Badge>
              <Badge className='bg-slate-100'>v1.0</Badge>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            {/* Frontend Column */}
            <div className='space-y-6'>
              <div className='flex items-center gap-2 mb-4'>
                <LayoutTemplate className='text-slate-400' />
                <h3 className='font-semibold text-lg'>Frontend</h3>
              </div>

              <TechItem
                label='Core Framework'
                description='Built with the latest React 19 standards and the new React Compiler for automatic optimization.'
                items={['React', 'React Compiler', 'TypeScript']}
              />

              <TechItem
                label='Styling & UI'
                description='Beautiful, accessible components styled with utility-first CSS.'
                items={['Tailwind CSS', 'Shadcn UI', 'Lucide React']}
              />
            </div>

            {/* Backend Column */}
            <div className='space-y-6'>
              <div className='flex items-center gap-2 mb-4'>
                <Server className='text-slate-400' />
                <h3 className='font-semibold text-lg'>Backend API</h3>
              </div>

              <TechItem
                label='Runtime & Server'
                description='Scalable Node.js environment utilizing Express for robust routing.'
                items={['Node.js', 'Express', 'REST API']}
              />

              <TechItem
                label='Validation & Security'
                description='Strict schema validation and secure stateless authentication.'
                items={['Zod', 'JWT', 'Bcrypt']}
              />

              <TechItem
                label='Reliability'
                description='Comprehensive testing suite to ensure rock-solid stability.'
                items={['Jest', 'Supertest']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 border-t border-slate-200 bg-slate-50'>
        <div className='container mx-auto max-w-4xl px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            Ready to streamline your operations?
          </h2>
          <p className='text-lg text-slate-600 mb-8'>
            Join the managers using Paymaster Control to deliver projects on
            time and under budget.
          </p>
          <Button
            variant='primary'
            size='lg'
            className='h-14 px-8 text-lg'
            onClick={handleDemoRedirect}
          >
            Get Started with Live Demo <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-12 border-t border-slate-200 bg-white text-slate-500 text-sm'>
        <div className='container mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='flex items-center gap-2 font-semibold text-slate-900'>
            <div className='bg-slate-900 text-white p-1 rounded-sm'>
              <LayoutTemplate size={14} />
            </div>
            Paymaster Control
          </div>
          <div className='flex gap-6'>
            <a href='#' className='hover:text-slate-900 transition-colors'>
              Documentation
            </a>
            <a href='#' className='hover:text-slate-900 transition-colors'>
              API Reference
            </a>
            <a href='#' className='hover:text-slate-900 transition-colors'>
              GitHub
            </a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Paymaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
