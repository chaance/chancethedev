import React from 'react';
import Layout from '$components/Layout';
import SEO from '$components/SEO';
import cx from 'classnames';
import VisuallyHidden from '@reach/visually-hidden';

const styles = require('./Resume.module.scss');

const Resume: React.FC = () => {
  return (
    <Layout>
      <SEO title="Chance's Resume" />
      <main className={styles.main}>
        <header>
          <h1 className={styles.pageTitle}>Chance Strickland</h1>
          <h2 className="h4">Front-end Web Developer + Consultant</h2>
          <p>
            Advocate developer for the web with a focus on greater usability and
            accessibility. Passionate about the details and user experience. My
            personal mission is to do good by others, learn daily and share
            success broadly.
          </p>
          <a
            href="/strickland-chance-resume.pdf"
            download
            className={cx('button', styles.print)}
          >
            Download
            <VisuallyHidden> the Resume</VisuallyHidden>
          </a>
        </header>
        <hr />
        <section aria-labelledby="section-heading-expertise">
          <h2
            id="section-heading-expertise"
            className={styles.expertiseHeading}
          >
            Technical Expertise
          </h2>
          <ExpertiseList
            items={[
              'JavaScript (ES6+)',
              'React',
              'CSS',
              'HTML5',
              'Web Accessibility (WCAG)',
              'Node',
              'PHP',
              'Laravel',
              'Vue',
              'WordPress',
              'Web Animation (SVG)',
            ]}
          />
        </section>
        <hr />
        <section aria-labelledby="section-heading-work">
          <h2 id="section-heading-work">Recent Work</h2>
          <RecentWorkItem
            title="Reach UI"
            url="https://reacttraining.com/reach-ui"
            description="OSS React component library"
            date="2019 – 2020"
          />
          <RecentWorkItem
            title="ReadyBase"
            url="https://www.readybase.com"
            description="React + Next.js. + Express + MongoDB"
            date="2019"
          />
          <RecentWorkItem
            title="Dash Financial"
            url="https://www.dashfinancial.com"
            description="React  + headless WordPress CMS"
            date="2018"
          />
        </section>
        <hr />
        <section aria-labelledby="section-heading-experience">
          <h2 id="section-heading-experience">Work Experience</h2>
          <Job
            jobTitle="Open Source Software Engineer"
            company="React Training"
            location="Remote"
            date="August 2019 – March 2020"
            url="https://reacttraining.com"
            descriptions={[
              'Manage and build highly accessible components for the Reach UI open source library',
              'Develop workshop training materials focused on web accessibility in the context of React and JavaScript',
            ]}
          />
          <Job
            jobTitle="Full-time Freelance Web Developer"
            company="Chance Digital"
            location="Remote"
            date="May 2018 – August 2019"
            url="https://chancedigital.io"
            descriptions={[
              'Build websites from small, self-managed projects to enterprise-scale web applications alongside teams',
              'Provide consulting and auditing services for WCAG accessibility compliance',
            ]}
            clients={[
              'ReadyBase',
              'Dash Financial Technologies',
              'Lee Company (Tennessee)',
              'Zander Insurance',
              'Slim and Husky’s',
              'Inigo Digital',
              'Harpeth Strategies',
              'Berry Interesting Productions',
            ]}
          />
          <Job
            jobTitle="Web Developer + Project Manager"
            company="SnapShot Interactive"
            location="Nashville, TN"
            date="December 2015 – July 2018"
            url="https://snapshotinteractive.com"
            descriptions={[
              'Build custom WordPress themes, plugins and integrations using external APIs',
              'Overhaul internal development processes using modern build tools (Node.js, webpack, Git) to improve productivity and collaboration',
              'Develop clearly defined scopes of work, and tightly monitor + manage project budgets to ensure profitability and timely completion',
            ]}
            clients={[
              'Girl Scouts of Middle Tennessee',
              'PYA, P.C.',
              'Qualifacts',
              'Aspire Health',
              'DWP LIVE',
              'Five Corners Strategies',
              'RJ Young',
              'Tennessee Hospital Association',
            ]}
          />
        </section>
        <hr />
        <section aria-labelledby="section-heading-education">
          <h2 id="section-heading-education">Education</h2>
          <article>
            <h3 className={styles.school}>
              Southern Polytechnic State University{' '}
              <span>(now Kennesaw State University)</span>
            </h3>
            <ul className={styles.inlineList}>
              <li>B.S. Technical Communications, Graphics and Digital Media</li>
              <li>2004 – 2010</li>
            </ul>
          </article>
        </section>
      </main>
    </Layout>
  );
};

function ExpertiseList(props: { items: string[] }) {
  return (
    <ul className={cx(styles.inlineList, styles.expertiseList)}>
      {props.items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function RecentWorkItem(props: {
  title: string;
  url: string;
  description: string;
  date: string;
}) {
  return (
    <article className={styles.recentWork}>
      <h3 className={styles.recentWorkHeading}>
        <a href={props.url}>{props.title}</a>
      </h3>
      <ul className={cx(styles.inlineList)}>
        <li>{props.description}</li>
        <li>{props.date}</li>
      </ul>
    </article>
  );
}

function Job(props: {
  jobTitle: string;
  location: string;
  date: string;
  company: string;
  url?: string;
  descriptions: string[];
  clients?: string[];
}) {
  return (
    <article className={styles.job}>
      <header>
        <h3 className={styles.jobHeading}>{props.jobTitle}</h3>
        <ul className={cx(styles.inlineList)}>
          <li>
            {props.url ? (
              <a href={props.url}>{props.company}</a>
            ) : (
              props.company
            )}
          </li>
          <li>{props.location}</li>
          <li>{props.date}</li>
          <li>{props.date}</li>
        </ul>
      </header>
      <ul>
        {props.descriptions.map(item => (
          <li key={item}>{item}</li>
        ))}
        {props.clients && props.clients.length && (
          <li>
            Clients include:{' '}
            <ul className={styles.clientList}>
              {props.clients.map(client => (
                <li key={client}>{client}</li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </article>
  );
}

export default Resume;
