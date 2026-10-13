import { AppShell } from '@/components/AppShell';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useState } from 'react';
import { CreditCard, Bell, ShieldCheck } from 'lucide-react';

export default function ScratchPage() {
  const [otp, setOtp] = useState('');
  const [notify, setNotify] = useState(true);

  return (
    <AppShell
      title="shadcn/ui Scratch Test"
      subtitle="Verifying components render in M-PESA red brand"
      actions={<ThemeToggle />}
    >
      <div style={{ display: 'grid', gap: 24, maxWidth: 480, padding: 24 }}>
        {/* Buttons — should be M-PESA red */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ margin: 0 }}>Buttons</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button onClick={() => toast.success('Payment sent!')}>Pay</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Delete</Button>
            <Button size="icon"><CreditCard /></Button>
          </div>
        </section>

        {/* Badge */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ margin: 0 }}>Badges</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge>New</Badge>
            <Badge variant="secondary">Pending</Badge>
            <Badge variant="outline">0 ETB</Badge>
            <Badge variant="destructive">Failed</Badge>
          </div>
        </section>

        {/* Input + Label */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" placeholder="09xx xxx xxx" />
        </section>

        {/* InputOTP — PIN entry style */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <Label>Enter PIN</Label>
          <InputOTP maxLength={4} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <span style={{ color: 'var(--color-on-surface-low)', fontSize: 12 }}>
            typed: {otp || '—'}
          </span>
        </section>

        {/* Switch */}
        <section style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Switch checked={notify} onCheckedChange={setNotify} />
          <Label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bell size={14} /> Notifications {notify ? 'on' : 'off'}
          </Label>
        </section>

        {/* Info card */}
        <section style={{
          display: 'flex', gap: 12, alignItems: 'center',
          padding: 16, borderRadius: 12,
          background: 'var(--color-surface-container)'
        }}>
          <ShieldCheck style={{ color: 'var(--color-success)' }} />
          <div>
            <div style={{ fontWeight: 600 }}>Secured</div>
            <div style={{ color: 'var(--color-on-surface-low)', fontSize: 13 }}>
              Toggle the theme (top-right) — both old and new components recolor.
            </div>
          </div>
        </section>
      </div>
      <Toaster position="top-center" />
    </AppShell>
  );
}
