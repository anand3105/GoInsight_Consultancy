"use client";

import BlogCodeBlock from "@/components/blog/BlogCodeBlock";
import BlogProTip from "@/components/blog/BlogProTip";
import BlogComparisonTable from "@/components/blog/BlogComparisonTable";
import BlogStatCard from "@/components/blog/BlogStatCard";

export default function SupplyChainAnalyticsGuide() {
  return (
    <>
      <p className="text-lg leading-relaxed">
        Supply chain analytics is the use of data from purchasing, inventory, warehousing and transport to measure performance,
        explain problems, predict demand and disruption, and recommend actions. It works at four levels:{" "}
        <strong>descriptive</strong> (what happened), <strong>diagnostic</strong> (why), <strong>predictive</strong> (what will
        happen) and <strong>prescriptive</strong> (what to do about it).
      </p>

      <p>
        Most supply chain teams already have plenty of data. It sits in an ERP, a warehouse management system, a transport
        system and a pile of spreadsheets that never quite agree. This guide shows how to turn that data into decisions: the
        12 KPIs worth tracking, the use cases that pay back fastest, the data sources you need, and a practical plan to get
        started. It is written for operations, logistics and finance leaders in India, the UAE, Saudi Arabia and Australia.
      </p>

      {/* ============================================================ */}
      <h2 id="what-is-supply-chain-analytics">What Is Supply Chain Analytics?</h2>

      <p>
        Supply chain analytics turns operational data into a single, trusted view of how goods, money and information move from
        suppliers to customers. Its purpose is better decisions on inventory, service levels and cost.
      </p>

      <p>
        The four levels build on each other. <strong>Descriptive</strong> analytics reports what happened, such as last
        month{"’"}s on-time delivery rate. <strong>Diagnostic</strong> analytics explains why, for example tracing late
        deliveries to one carrier or one distribution centre. <strong>Predictive</strong> analytics forecasts demand, lead times
        and stockout risk. <strong>Prescriptive</strong> analytics recommends what to do, such as reorder quantities or which
        warehouse should fulfil an order.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 not-prose">
        <BlogStatCard
          value="4"
          label="Levels of Analytics"
          description="Descriptive, diagnostic, predictive and prescriptive, each building on the one before"
        />
        <BlogStatCard
          value="12"
          label="Core KPIs"
          description="The supply chain metrics we recommend most teams track first, covered in the table below"
        />
        <BlogStatCard
          value="8–12 wks"
          label="Typical First Project"
          description="In our experience, a focused first supply chain dashboard goes live within two to three months"
        />
      </div>

      {/* ============================================================ */}
      <h2 id="why-it-matters">Why Does Supply Chain Analytics Matter?</h2>

      <p>
        Supply chain analytics matters because inventory, freight and service failures are expensive and usually visible in the
        data before they become crises. Seeing them early is the difference between a planned response and a costly scramble.
      </p>

      <p>
        Inventory ties up working capital. Stockouts lose sales and customer trust. Expedited freight erodes margin. Each of
        these problems leaves a trail in your systems: a supplier whose lead times keep stretching, a SKU whose forecast error
        keeps growing, a lane whose carrier keeps missing delivery windows. Without analytics, teams notice these patterns only
        after the damage is done.
      </p>

      <p>
        Analytics also creates one version of the truth. When procurement, warehousing, sales and finance all read from the same
        dashboard, meetings shift from arguing about whose numbers are right to deciding what to do next.
      </p>

      {/* ============================================================ */}
      <h2 id="kpis">What Are the 12 Most Important Supply Chain KPIs?</h2>

      <p>
        The 12 KPIs below cover service, inventory, cost and supplier performance. Together they give a balanced view, so
        improving one metric does not quietly damage another.
      </p>

      <BlogComparisonTable
        headers={["KPI", "Formula", "Target Direction"]}
        rows={[
          ["OTIF (On Time In Full)", "Orders delivered on time and complete ÷ total orders", "Higher is better"],
          ["Perfect Order Rate", "Orders on time, complete, undamaged and correctly invoiced ÷ total orders", "Higher is better"],
          ["Fill Rate", "Units shipped from stock ÷ units ordered", "Higher is better"],
          ["Inventory Turnover", "Cost of goods sold ÷ average inventory value", "Higher is better"],
          ["Days of Inventory on Hand", "Average inventory ÷ cost of goods sold × 365", "Lower, within service limits"],
          ["Stockout Rate", "SKU-locations out of stock ÷ total SKU-locations", "Lower is better"],
          ["Forecast Accuracy (MAPE)", "Average of |actual − forecast| ÷ actual", "Lower MAPE is better"],
          ["Cash-to-Cash Cycle Time", "Days inventory + days receivables − days payables", "Lower is better"],
          ["Freight Cost per Unit", "Total freight cost ÷ units shipped", "Lower is better"],
          ["Supplier Lead Time Variability", "Standard deviation of supplier lead times", "Lower is better"],
          ["Warehouse Order Cycle Time", "Time from order release to dispatch", "Lower is better"],
          ["Carrier On-Time Rate", "Shipments delivered within window ÷ total shipments", "Higher is better"],
        ]}
        highlightFirst={true}
      />

      <p>
        Track these KPIs by product, location, supplier and customer segment, not only as company-wide averages. An overall OTIF
        that looks healthy can hide one region or one key account that is consistently let down. For more dashboard ideas across
        functions, see our guide to the{" "}
        <a href="/blog/top-10-kpi-dashboards-2026">top 10 KPI dashboards for 2026</a>.
      </p>

      <p>
        Here is how OTIF can be calculated as a Power BI measure, assuming an orders table with promised and delivered dates and
        quantities:
      </p>

      <BlogCodeBlock
        language="dax"
        filename="OTIF.dax"
        code={`OTIF % =
VAR TotalOrders =
    DISTINCTCOUNT ( Orders[OrderID] )
VAR OTIFOrders =
    CALCULATE (
        DISTINCTCOUNT ( Orders[OrderID] ),
        FILTER (
            Orders,
            Orders[DeliveredDate] <= Orders[PromisedDate]
                && Orders[DeliveredQty] >= Orders[OrderedQty]
        )
    )
RETURN
    DIVIDE ( OTIFOrders, TotalOrders )`}
      />

      <BlogProTip title="Agree Definitions Before Building Dashboards">
        {"“"}On time{"”"} can mean on the promised date, within a delivery window, or by the customer{"’"}s requested date.
        Write down one definition for each KPI and get sign-off from operations, sales and finance before you build anything.
        In our experience, disputed definitions sink more supply chain dashboards than bad data does.
      </BlogProTip>

      {/* ============================================================ */}
      <h2 id="use-cases">What Are the Best Supply Chain Analytics Use Cases?</h2>

      <p>
        The best use cases are those where better information changes a frequent, costly decision. These six deliver value
        across most industries.
      </p>

      <h3>1. Demand Planning and Forecasting</h3>
      <p>
        Statistical and machine learning forecasts capture seasonality, promotions and holidays far better than last year{"’"}s
        sales plus a growth percentage. Better forecasts feed directly into purchasing and production plans. Our guide to{" "}
        <a href="/blog/predictive-analytics-in-retail">predictive analytics in retail</a> covers forecasting models in more
        depth.
      </p>

      <h3>2. Inventory Optimisation</h3>
      <p>
        Analytics sets safety stock and reorder points per SKU and location based on demand variability and lead time, instead
        of one blanket rule. The aim is to hold less stock of slow movers and more of the items that drive service failures.
      </p>

      <h3>3. Supplier Performance Management</h3>
      <p>
        Scorecards that track lead time, lead time variability, quality and fill rate by supplier turn quarterly review
        meetings into evidence-based conversations, and flag suppliers who need a backup source.
      </p>

      <h3>4. Transport and Freight Analytics</h3>
      <p>
        Lane-level analysis of cost per unit, carrier on-time rate and load utilisation shows where to consolidate shipments,
        renegotiate rates or switch carriers.
      </p>

      <h3>5. Warehouse Productivity</h3>
      <p>
        Pick rates, order cycle time and dock-to-stock time by shift and zone reveal bottlenecks and help plan labour for peak
        periods.
      </p>

      <h3>6. Disruption and Risk Monitoring</h3>
      <p>
        Alerts on shipment delays, rising lead times or unusual demand spikes give teams time to react, whether that means
        expediting, re-routing or reallocating stock between locations.
      </p>

      <p>
        You can explore how these views come together in our live{" "}
        <a href="/demo/supply-chain">supply chain analytics demo dashboard</a>. For plant-side metrics such as OEE and
        production yield, see the <a href="/demo/manufacturing">manufacturing demo</a>.
      </p>

      {/* ============================================================ */}
      <h2 id="data-sources">What Data Do You Need for Supply Chain Analytics?</h2>

      <p>
        You need transaction data from your ERP, warehouse system and transport system, joined by shared keys such as order,
        SKU, location and supplier. Sensor and GPS data adds real-time visibility, but it is not required to start.
      </p>

      <BlogComparisonTable
        headers={["Source", "Examples", "What It Provides"]}
        rows={[
          ["ERP", "SAP, Oracle, Microsoft Dynamics 365, Tally", "Orders, purchase orders, inventory values, invoices"],
          ["WMS", "Warehouse management systems", "Receipts, picks, putaway, order cycle times"],
          ["TMS", "Transport management systems, carrier portals", "Shipments, freight costs, delivery events"],
          ["IoT / GPS", "Vehicle trackers, temperature sensors", "Live location, ETAs, cold-chain conditions"],
          ["Planning files", "Excel and Google Sheets forecasts", "Demand plans, promotions, targets"],
        ]}
        highlightFirst={true}
      />

      <p>
        The hardest part is rarely the connection itself. It is reconciling master data: the same product with three codes,
        warehouses named differently in each system, or suppliers duplicated after a migration. Budget time for this, and assign
        an owner for each master data domain.
      </p>

      {/* ============================================================ */}
      <h2 id="regional-context">How Does Supply Chain Analytics Differ by Region?</h2>

      <p>
        The fundamentals are the same everywhere, but local regulation, geography and trade patterns change which data and KPIs
        matter most.
      </p>

      <p>
        <strong>India:</strong> GST e-way bills are required for many goods movements, which makes e-way bill data a useful
        source for tracking shipments between states. Multi-tier distributor networks also make secondary sales visibility a
        common priority.
      </p>

      <p>
        <strong>UAE:</strong> Dubai{"’"}s Jebel Ali port and free zones make the UAE a major re-export hub, so many businesses
        track inbound, bonded and re-export flows separately and care closely about dwell time and customs clearance.
      </p>

      <p>
        <strong>Saudi Arabia:</strong> the logistics sector is a stated priority under Vision 2030, with investment in ports,
        rail and logistics zones. Businesses expanding there often need analytics that handle new routes and fast-changing
        network design.
      </p>

      <p>
        <strong>Australia:</strong> long distances between cities and remote sites make freight cost per unit, transit time
        variability and inventory positioning especially important, particularly for mining, agriculture and regional retail.
      </p>

      {/* ============================================================ */}
      <h2 id="common-mistakes">What Are the Most Common Supply Chain Analytics Mistakes?</h2>

      <p>
        The most common mistakes are tracking too many KPIs, optimising one metric at the expense of others, and building
        dashboards that no decision meeting actually uses.
      </p>

      <p>
        <strong>Too many KPIs at once.</strong> A dashboard with forty metrics gets glanced at and ignored. Start with the
        handful that measure your chosen problem and add more only when a team asks for them.
      </p>

      <p>
        <strong>Optimising in silos.</strong> Cutting inventory improves turnover but can wreck fill rate. Cheaper carriers
        lower freight cost but can hurt OTIF. Always show paired metrics side by side so trade-offs stay visible.
      </p>

      <p>
        <strong>Averages that hide problems.</strong> Company-wide figures smooth over the SKUs, lanes and customers that cause
        most of the pain. Make drill-down by product, location, supplier and customer a standard feature.
      </p>

      <p>
        <strong>Ignoring master data.</strong> Duplicate SKUs and inconsistent location codes quietly distort every KPI. Treat
        master data as an ongoing responsibility with named owners, not a one-off clean-up.
      </p>

      <p>
        <strong>No link to action.</strong> A KPI that turns red but has no owner and no agreed response is just decoration.
        For each metric, decide who acts and what they do when it moves outside its target range.
      </p>

      {/* ============================================================ */}
      <h2 id="getting-started-steps">How Do You Get Started with Supply Chain Analytics?</h2>

      <p>
        Start with one decision you want to improve, a small set of KPIs that measure it, and the data needed to calculate them.
        Prove value with one dashboard before connecting every system.
      </p>

      <h3>Step 1: Pick the Business Question</h3>
      <p>
        Choose a single pain point, such as frequent stockouts, rising freight costs or poor OTIF for key customers. Name the
        owner and the decision that will change.
      </p>

      <h3>Step 2: Define Three to Five KPIs</h3>
      <p>
        Select KPIs from the table above that measure the problem, and agree their definitions with every team that will use
        them.
      </p>

      <h3>Step 3: Connect and Clean the Data</h3>
      <p>
        Extract the needed fields from your ERP, WMS or TMS, reconcile master data, and build a simple data model with clear
        dimensions for product, location, supplier, customer and date.
      </p>

      <h3>Step 4: Build and Adopt the Dashboard</h3>
      <p>
        Build a focused dashboard in Power BI or a similar tool, then use it in the weekly operations meeting. Adoption in a
        real decision forum matters more than visual polish.
      </p>

      <h3>Step 5: Add Prediction and Automation</h3>
      <p>
        Once the descriptive layer is trusted, add forecasts, alerts and recommended actions. Our{" "}
        <a href="/roi-analytics">ROI analytics page</a> shows how to estimate the business value of each step.
      </p>

      <BlogProTip title="Refresh Frequency Should Match the Decision">
        Not every supply chain dashboard needs real-time data. Daily refresh is enough for most inventory and supplier
        decisions. Reserve near-real-time feeds for transport tracking and warehouse operations, where the decision really
        happens within hours.
      </BlogProTip>

      {/* ============================================================ */}
      <h2 id="getting-started">Getting Started with GoInsight</h2>

      <p>
        Supply chain analytics does not require a multi-year transformation programme. It starts with clear KPI definitions,
        clean master data and one dashboard that a real team uses every week. From there, forecasting and optimisation build on
        a foundation people already trust.
      </p>

      <p>
        At <strong>GoInsight</strong>, we help manufacturers, distributors, retailers and logistics companies across India, the
        UAE, Saudi Arabia and Australia build supply chain dashboards and forecasting models on Power BI, Microsoft Fabric and
        Python. If you would like to talk through your supply chain data and where to start,{" "}
        <a href="/contact">get in touch with our team</a> for a free consultation.
      </p>
    </>
  );
}
