import { faqs } from "@/data/home";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";

export function FaqSection() {
  return (
    <Section id="faq" className="border-b border-border/60">
      <FadeIn>
        <SectionHeading
          eyebrow="FAQ"
          title="Answer the questions that usually block first engagement."
          description="The content here should lower friction for new contributors, partners, and curious adopters who want to understand what the initiative is becoming."
          align="center"
        />
      </FadeIn>

      <FadeIn delay={0.08} className="mx-auto mt-12 max-w-3xl">
        <div className="rounded-[2rem] border border-border/70 bg-card/80 p-6 shadow-[0_12px_50px_rgba(0,0,0,0.08)] sm:p-8">
          <Accordion defaultValue={["item-0"]} className="gap-2">
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="rounded-2xl border border-transparent px-2 not-last:border-b not-last:border-border/60"
              >
                <AccordionTrigger className="py-4 text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </FadeIn>
    </Section>
  );
}
