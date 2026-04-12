import type { Metadata } from "next";

import { ContentPageHeader, TimelineEntry, VersionBadge } from "@/components/content/content-ui";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getCollectionEntries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Changelog",
  "Release notes, shipped improvements, and software-native product movement from Sonicverse.",
  "/changelog",
);

export default async function ChangelogPage() {
  const entries = await getCollectionEntries("changelog");
  const latestRelease = entries[0];

  return (
    <>
      <ContentPageHeader
        eyebrow="Changelog"
        title="A release feed that reads like product infrastructure."
        description="Shipped improvements, release notes, and product movement presented with software-native clarity."
        kicker={
          latestRelease ? (
            <Card>
              <CardHeader className="space-y-4">
                <Badge variant="muted">Latest release</Badge>
                <div className="space-y-2">
                  <VersionBadge version={latestRelease.frontmatter.version} />
                  <CardTitle className="text-[1.3rem]">{latestRelease.frontmatter.title}</CardTitle>
                  <CardDescription>{latestRelease.frontmatter.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ) : null
        }
      />

      <section className="pb-24 sm:pb-28">
        <Container className="space-y-8">
          <Reveal className="space-y-2">
            <Badge variant="muted">Release feed</Badge>
            <p className="max-w-2xl text-sm leading-7 text-foreground/62">
              Newest first. Clear versioning. Enough context to explain what changed and why.
            </p>
          </Reveal>
          <div className="space-y-6">
            {entries.map((entry) => (
              <TimelineEntry key={entry.slug} entry={entry} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
