'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
import { FadeIn } from '@/components/motion-wrapper';
import { profile } from '@/lib/data';
import { ease } from '@/lib/motion';

const contactChannels = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: profile.phone,
    href: profile.phoneHref,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: profile.location,
    href: null,
  },
];

const socials = [
  { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: profile.github, icon: Github, label: 'GitHub' },
];

const fields = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" },
] as const;

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: formData.subject,
            message: formData.message,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to send message');

      toast.success('Message sent successfully!', {
        description: "I'll get back to you as soon as possible.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message', {
        description: 'Please try again or email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Contact"
            title="Let's build"
            accent="something"
            description="Have a role, a project, or just a question? My inbox is open."
            className="mb-16"
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            {/* Channels */}
            <FadeIn direction="right">
              <div className="flex h-full flex-col gap-4">
                {contactChannels.map((channel, index) => {
                  const content = (
                    <SpotlightCard className="p-5">
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/60 text-brand-1">
                          <channel.icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            {channel.label}
                          </p>
                          <p className="truncate font-medium">{channel.value}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  );

                  return (
                    <motion.div
                      key={channel.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: 0.5,
                        ease: ease.out,
                        delay: shouldReduceMotion ? 0 : index * 0.08,
                      }}
                    >
                      {channel.href ? (
                        <a
                          href={channel.href}
                          className="block transition-transform hover:-translate-y-0.5"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </motion.div>
                  );
                })}

                {/* Socials */}
                <div className="mt-auto rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-sm">
                  <p className="mb-3 text-sm text-muted-foreground">
                    Find me online
                  </p>
                  <div className="flex gap-2.5">
                    {socials.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        whileHover={shouldReduceMotion ? {} : { y: -3 }}
                        transition={{ duration: 0.2, ease: ease.out }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/70 bg-background/50 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-brand-1/50 hover:text-brand-1"
                      >
                        <social.icon className="h-4 w-4" />
                        {social.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn direction="left" delay={0.1}>
              <SpotlightCard className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{
                          duration: 0.45,
                          ease: ease.out,
                          delay: shouldReduceMotion ? 0 : 0.1 + index * 0.07,
                        }}
                        className={field.id === 'subject' ? 'sm:col-span-2' : ''}
                      >
                        <Label htmlFor={field.id} className="text-sm">
                          {field.label}
                        </Label>
                        <Input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          value={formData[field.id]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required
                          className="mt-2 h-11 rounded-xl border-border/70 bg-background/50 transition-shadow focus-visible:ring-brand-1/40"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.45,
                      ease: ease.out,
                      delay: shouldReduceMotion ? 0 : 0.32,
                    }}
                  >
                    <Label htmlFor="message" className="text-sm">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me more..."
                      required
                      rows={6}
                      className="mt-2 resize-none rounded-xl border-border/70 bg-background/50 transition-shadow focus-visible:ring-brand-1/40"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.45,
                      ease: ease.out,
                      delay: shouldReduceMotion ? 0 : 0.4,
                    }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group h-12 w-full rounded-xl bg-gradient-to-r from-brand-1 to-brand-3 text-white shadow-lg shadow-brand-1/20 transition-shadow hover:shadow-xl hover:shadow-brand-1/30"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
