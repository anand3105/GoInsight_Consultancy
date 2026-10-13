"use client";

import BlogCodeBlock from "@/components/blog/BlogCodeBlock";
import BlogProTip from "@/components/blog/BlogProTip";
import BlogComparisonTable from "@/components/blog/BlogComparisonTable";
import BlogStatCard from "@/components/blog/BlogStatCard";

export default function PowerBIDashboardDesignBestPractices() {
  return (
    <>
      <p className="text-lg leading-relaxed">
        Power BI dashboard design best practices come down to three things: build each page around one business decision,
        keep the layout simple enough to read in seconds, and back it with a fast, well-modelled dataset. Get those right and
        people use your reports. Get them wrong and even accurate numbers get ignored.
      </p>

      <p>
        This guide collects the 15 rules we apply on every Power BI project at GoInsight, for clients in India, Dubai, the wider
        UAE, Saudi Arabia, and Australia. They are grouped into four stages: planning, layout and visuals, data model and
        performance, and accessibility and governance. Each rule is practical, tool-specific, and something you can apply to the
        report you are working on today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 not-prose">
        <BlogStatCard
          value="15"
          label="Design Rules"
          description="Grouped into planning, layout, data model, and governance so you can audit any report step by step"
        />
        <BlogStatCard
          value="1"
          label="Decision per Page"
          description="Every report page should answer one main business question for one audience"
        />
        <BlogStatCard
          value="5–7"
          label="Headline KPIs"
          description="A sensible upper limit for the KPI cards across the top of a single page"
        />
      </div>

      {/* ============================================================ */}
      <h2 id="why-design-matters">Why Does Power BI Dashboard Design Matter?</h2>

      <p>
        Design decides whether a dashboard gets used. A report with correct numbers but a cluttered layout, slow visuals, or
        confusing colours will be abandoned for the spreadsheet it was meant to replace.
      </p>

      <p>
        Good design is not decoration. It reduces the time between opening a report and making a decision. That means a clear
        visual hierarchy, consistent formatting, and a data model that responds quickly when someone clicks a slicer. In our
        experience, most {"“"}nobody uses our dashboards{"”"} complaints trace back to one of three causes: the report answers
        the wrong question, it shows too much at once, or it is too slow. The rules below address all three.
      </p>

      {/* ============================================================ */}
      <h2 id="plan">Plan Before You Build (Rules 1{"–"}4)</h2>

      <p>
        The best Power BI reports are designed on paper before anyone opens Power BI Desktop. Planning decides who the report
        is for, what decision it supports, and which few numbers matter most.
      </p>

      <h3>1. Start With the Audience and the Decision</h3>
      <p>
        Write down who will use the report and what they will decide with it. A CFO reviewing monthly margin needs a different
        page from a store manager checking today{"’"}s stock. If you cannot name the decision, you are not ready to build.
      </p>

      <h3>2. Give Each Page One Purpose</h3>
      <p>
        Every page should answer one main question, such as {"“"}Are we on track for this quarter{"’"}s revenue target?{"”"}
        Supporting detail belongs on separate drillthrough pages, not crammed onto the overview.
      </p>

      <h3>3. Choose a Small Set of KPIs</h3>
      <p>
        Pick the five to seven measures that best answer the page{"’"}s question, and define each one precisely: formula,
        filters, and time period. Agreeing definitions up front prevents the classic meeting where two departments argue over
        whose {"“"}revenue{"”"} is right. For ideas by function, see our guide to the{" "}
        <a href="/blog/top-10-kpi-dashboards-2026">top 10 KPI dashboards for 2026</a>.
      </p>

      <h3>4. Sketch a Wireframe First</h3>
      <p>
        A rough sketch on paper or a whiteboard lets stakeholders agree on layout before any DAX is written. Changing a sketch
        takes minutes. Changing a finished report takes days.
      </p>

      <BlogProTip title="Ask “So What?” for Every Visual">
        For each chart on your wireframe, ask what action someone would take if the number went up or down. If the answer is
        {" “"}none{"”"}, remove the visual or move it to a detail page.
      </BlogProTip>

      {/* ============================================================ */}
      <h2 id="layout-visuals">Layout & Visuals (Rules 5{"–"}9)</h2>

      <p>
        A good Power BI layout puts the most important numbers top-left, uses the simplest chart that answers the question, and
        stays visually consistent across every page.
      </p>

      <h3>5. Follow a Clear Reading Order</h3>
      <p>
        People scan a screen from the top-left, across, then down. Place headline KPI cards in a row across the top, trend
        charts in the middle, and detailed tables at the bottom. Keep slicers in one consistent place, such as a left-hand
        panel or a top bar, on every page.
      </p>

      <h3>6. Pick the Right Visual for the Job</h3>
      <p>
        Use line charts for trends over time, bar charts for comparing categories, cards for single numbers, and tables or
        matrices when users need exact values. Avoid pie and donut charts with more than a few slices, 3D effects, and gauges
        that take up space for a single figure. The simplest accurate chart is almost always the best one.
      </p>

      <h3>7. Limit the Number of Visuals per Page</h3>
      <p>
        Every visual adds visual noise and sends its own queries to the dataset. Fewer visuals means a page that is both easier
        to read and faster to load. If a page feels crowded, split it, or move secondary charts behind a drillthrough or a
        bookmark.
      </p>

      <h3>8. Use a Report Theme JSON for Consistency</h3>
      <p>
        Instead of formatting each visual by hand, define your colours, fonts, and default visual settings in a report theme
        JSON file and import it under View, then Themes. Every new visual then follows your brand automatically, and a theme
        can be reused across all your reports.
      </p>

      <BlogCodeBlock
        language="json"
        filename="goinsight-theme.json"
        code={`{
  "name": "GoInsight Corporate",
  "dataColors": ["#1F4E79", "#ECC41A", "#5C6370", "#2E8B57", "#C0392B", "#8E44AD"],
  "background": "#FFFFFF",
  "foreground": "#101624",
  "tableAccent": "#ECC41A",
  "good": "#2E8B57",
  "neutral": "#ECC41A",
  "bad": "#C0392B"
}`}
      />

      <h3>9. Put Detail Behind Drillthrough, Tooltips, and Bookmarks</h3>
      <p>
        Keep the overview clean and let users pull detail on demand. Drillthrough pages let someone right-click a region or
        product and jump to a filtered detail view. Report page tooltips show a mini chart on hover. Bookmarks switch between
        views, such as chart and table, without adding more pages. Field parameters let users choose which measure or
        dimension a single visual shows, replacing several near-identical charts.
      </p>

      <p>
        You can see these patterns in action in our live{" "}
        <a href="/demo/sales-marketing">sales and marketing dashboard</a> and{" "}
        <a href="/demo/finance">finance dashboard</a> demos.
      </p>

      {/* ============================================================ */}
      <h2 id="data-model-performance">Data Model & Performance (Rules 10{"–"}13)</h2>

      <p>
        A fast, trustworthy Power BI report depends on a star schema data model, logic written as measures, and regular checks
        with Performance Analyzer. Most slow reports are slow because of the model, not the visuals.
      </p>

      <h3>10. Model Your Data as a Star Schema</h3>
      <p>
        Organise data into fact tables, such as sales transactions, surrounded by dimension tables, such as date, product,
        customer, and region. Use single-direction, one-to-many relationships wherever possible, and always include a proper
        date table marked as a date table. A star schema keeps DAX simpler, filters predictable, and the VertiPaq engine
        efficient. Avoid one huge flat table and avoid bi-directional relationships unless you have a specific reason.
      </p>

      <h3>11. Prefer Measures Over Calculated Columns</h3>
      <p>
        Measures are calculated at query time and respond to filters and slicers. Calculated columns are computed at refresh
        and stored in the model, which increases its size. Use calculated columns only when you need a value to slice or filter
        by. For anything aggregated, such as totals, ratios, and growth rates, write a measure. Where possible, push row-level
        transformations upstream into Power Query or your data warehouse.
      </p>

      <h3>12. Write Readable, Safe DAX</h3>
      <p>
        Use variables to make measures easier to read and to avoid repeating the same calculation. Use DIVIDE instead of the
        division operator so that a zero denominator returns a blank instead of an error. Keep measures in a dedicated display
        folder or measures table with clear names.
      </p>

      <BlogCodeBlock
        language="dax"
        filename="Gross Margin % vs LY.dax"
        code={`Gross Margin % vs LY =
VAR CurrentMargin =
    DIVIDE ( [Total Revenue] - [Total Cost], [Total Revenue] )
VAR LastYearMargin =
    CALCULATE (
        DIVIDE ( [Total Revenue] - [Total Cost], [Total Revenue] ),
        SAMEPERIODLASTYEAR ( 'Date'[Date] )
    )
RETURN
    CurrentMargin - LastYearMargin`}
      />

      <h3>13. Measure Performance, Then Fix the Slowest Parts</h3>
      <p>
        Open Performance Analyzer from the Optimize ribbon, start recording, and refresh the visuals. It shows how long each
        visual spends on the DAX query and on rendering. Fix the slowest items first. Common fixes include removing unused
        columns, reducing high-cardinality columns such as timestamps with seconds, using Import mode instead of DirectQuery
        where data volumes allow, and reducing the number of visuals on a page.
      </p>

      <BlogProTip title="Remove Columns Nobody Uses">
        Every column you import makes the model bigger and refreshes slower. Before publishing, review each table and remove
        columns that no visual, measure, or relationship uses. It is one of the simplest Power BI performance optimizations
        available.
      </BlogProTip>

      {/* ============================================================ */}
      <h2 id="accessibility-governance">Accessibility & Governance (Rules 14{"–"}15)</h2>

      <p>
        An accessible, well-governed report can be used by everyone who needs it and trusted by everyone who reads it. Power
        BI includes built-in features for both.
      </p>

      <h3>14. Design for Accessibility</h3>
      <p>
        Add alt text to every visual so screen readers can describe it. Set the tab order in the Selection pane so keyboard
        users move through the page logically. Use sufficient colour contrast and never rely on colour alone to show meaning:
        pair red and green with icons, labels, or arrows, because many people cannot tell those colours apart. Use readable
        font sizes, and check the page with the accessibility features in Power BI Desktop before publishing.
      </p>

      <h3>15. Govern Security, Definitions, and Ownership</h3>
      <p>
        Apply row-level security so each user sees only the data they are permitted to see, such as their own region or
        business unit. Publish shared semantic models and mark trusted ones as promoted or certified, so teams build from a
        single source of truth instead of copying datasets. Name measures consistently, document KPI definitions, and assign
        an owner to every report. In regulated markets, such as financial services in the UAE and Saudi Arabia, or any business
        handling personal data under India{"’"}s DPDP Act or Australia{"’"}s Privacy Act, governance is as important as
        design.
      </p>

      {/* ============================================================ */}
      <h2 id="do-dont">Power BI Design Do{"’"}s and Don{"’"}ts: Quick Reference</h2>

      <p>
        Use this table as a checklist when reviewing any Power BI report before it is published.
      </p>

      <BlogComparisonTable
        headers={["Area", "Do", "Don’t"]}
        rows={[
          [
            "Purpose",
            "Build each page around one decision and one audience",
            "Put every available metric on a single page",
          ],
          [
            "Layout",
            "Headline KPIs top-left, trends in the middle, detail at the bottom",
            "Scatter slicers and visuals in different places on each page",
          ],
          [
            "Visuals",
            "Use line, bar, card, and table visuals that match the question",
            "Use 3D charts, crowded pies, or decorative gauges",
          ],
          [
            "Formatting",
            "Apply a report theme JSON for colours and fonts",
            "Format each visual by hand with one-off colours",
          ],
          [
            "Detail",
            "Use drillthrough, tooltips, bookmarks, and field parameters",
            "Duplicate near-identical pages for each filter",
          ],
          [
            "Data model",
            "Use a star schema with a marked date table",
            "Load one huge flat table with bi-directional filters",
          ],
          [
            "Calculations",
            "Write measures with VAR and DIVIDE",
            "Use calculated columns for aggregations",
          ],
          [
            "Performance",
            "Check Performance Analyzer and remove unused columns",
            "Publish without testing load times",
          ],
          [
            "Accessibility",
            "Add alt text, set tab order, and pair colour with icons",
            "Rely on red and green alone to show status",
          ],
          [
            "Governance",
            "Use row-level security and certified semantic models",
            "Share copies of datasets with different definitions",
          ],
        ]}
        highlightFirst={true}
      />

      <p>
        If you are still choosing a platform, our comparison of{" "}
        <a href="/blog/power-bi-vs-tableau">Power BI vs Tableau</a> covers how the two tools differ on design flexibility,
        cost, and governance.
      </p>

      {/* ============================================================ */}
      <h2 id="getting-started">Getting Started</h2>

      <p>
        Start by auditing one existing report against these 15 rules. Pick the page people use most, check it against the
        do{"’"}s and don{"’"}ts table, and fix the three biggest issues first. In most cases that means clarifying the page{"’"}s
        purpose, removing visuals, and tidying the data model.
      </p>

      <p>
        At <strong>GoInsight</strong>, we design and rebuild Power BI reports for organisations across India, Dubai, the UAE,
        Saudi Arabia, and Australia, from data modelling and DAX to report design, performance tuning, and training. Our{" "}
        <a href="/blog/power-bi-consulting-services-guide">guide to Power BI consulting services</a> explains how a typical
        engagement works. If you would like a second pair of eyes on your reports, you can{" "}
        <a href="/contact">book a free consultation</a> with our team.
      </p>
    </>
  );
}
