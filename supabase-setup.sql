-- 1. Create Invoices Table
CREATE TABLE public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  date DATE NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'Draft' NOT NULL,
  total NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Invoices
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Allow users to perform all actions on their OWN invoices
CREATE POLICY "Users can manage their own invoices" 
ON public.invoices 
FOR ALL USING (auth.uid() = user_id);

-- 2. Create Invoice Items Table
CREATE TABLE public.invoice_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  price NUMERIC(10, 2) DEFAULT 0.00 NOT NULL
);

-- Enable RLS for Invoice Items
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;

-- Allow users to perform all actions on items belonging to their invoices
CREATE POLICY "Users can manage their own invoice items" 
ON public.invoice_items 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.invoices 
    WHERE public.invoices.id = public.invoice_items.invoice_id 
    AND public.invoices.user_id = auth.uid()
  )
);
