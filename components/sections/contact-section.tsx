'use client';

import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { FadeIn } from '@/components/motion-wrapper';
import { TiltCard } from '@/components/tilt-card';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Message sent successfully!', {
        description: "I'll get back to you as soon as possible.",
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch {
      toast.error('Failed to send message', {
        description: 'Please try again or contact me directly via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactCards = [
    {
      icon: Mail,
      title: 'Email',
      content: 'bravelydirgayuska@gmail.com',
      href: 'mailto:bravelydirgayuska@gmail.com',
      color: 'blue',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+62 811-889-9743',
      href: 'tel:+628118899743',
      color: 'green',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Tembalang, Semarang, Indonesia',
      href: null,
      color: 'orange',
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In{' '}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}
                animate={shouldReduceMotion ? {} : {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Touch
              </motion.span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn direction="left" delay={0.1}>
              <h3 className="text-2xl font-bold mb-6">Let&apos;s Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I&apos;m always open to discussing new opportunities, collaborations, or just
                having a chat about technology. Feel free to reach out through the contact
                form or via my direct contact information below.
              </p>

              <div className="space-y-6">
                {contactCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: shouldReduceMotion ? 0 : 0.2 + index * 0.1,
                      duration: 0.5,
                    }}
                  >
                    <TiltCard maxTilt={5} scale={1.02}>
                      <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <motion.div 
                              className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                card.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                card.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                                'bg-orange-100 dark:bg-orange-900/30'
                              }`}
                              whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <card.icon className={`h-6 w-6 ${
                                card.color === 'blue' ? 'text-blue-600' :
                                card.color === 'green' ? 'text-green-600' :
                                'text-orange-600'
                              }`} />
                            </motion.div>
                            <div>
                              <h4 className="font-semibold mb-1">{card.title}</h4>
                              {card.href ? (
                                <a
                                  href={card.href}
                                  className={`text-muted-foreground transition-colors ${
                                    card.color === 'blue' ? 'hover:text-blue-600' :
                                    card.color === 'green' ? 'hover:text-green-600' :
                                    'hover:text-orange-600'
                                  }`}
                                >
                                  {card.content}
                                </a>
                              ) : (
                                <p className="text-muted-foreground">{card.content}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <TiltCard maxTilt={3} scale={1.01}>
                <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {[
                        { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                        { id: 'email', label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
                        { id: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" },
                      ].map((field, index) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1,
                            duration: 0.4,
                          }}
                        >
                          <Label htmlFor={field.id}>{field.label}</Label>
                          <Input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required
                            className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: shouldReduceMotion ? 0 : 0.6,
                          duration: 0.4,
                        }}
                      >
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell me more..."
                          required
                          rows={5}
                          className="mt-2 resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: shouldReduceMotion ? 0 : 0.7,
                          duration: 0.4,
                        }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 group"
                        >
                          <motion.span
                            className="flex items-center justify-center"
                            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                          >
                            <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </motion.span>
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </TiltCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
