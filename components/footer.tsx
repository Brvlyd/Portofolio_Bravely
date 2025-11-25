'use client';

import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Bravely Dirgayuska
            </h3>
            <p className="text-sm text-muted-foreground">
              Computer Engineering student passionate about building innovative solutions
              and contributing to technological advancement.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Experience
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/bravelyd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/Brvlyd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:bravelydirgayuska@gmail.com"
                className="p-2 rounded-full bg-secondary hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+628118899743"
                className="p-2 rounded-full bg-secondary hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Bravely Dirgayuska. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
