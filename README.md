# OVHcloud × Elastic Meetup #104

**Taming OVH's control plane. Eleven OVHcloud products. One Fleet.**

18 November 2026 · Frederic Maussion (Principal Solutions Architect, Elastic) with Aurelie Vache and Stephane Philippart (OVHcloud)

## About the meetup

An SRE running on OVHcloud has to hunt through a separate console or API for every product: servers, Kubernetes, databases, storage, billing. This talk shows how to bring all of it into Elasticsearch with custom Elastic integrations, so the data lands on one timeline with the same fields.

It covers:

1. **The fragmented control plane:** why eleven OVHcloud products mean eleven places to look.
2. **What an Elastic integration is:** collect, schema, value, and how Elastic Agent ties them together.
3. **Building one with an AI agent:** `elastic-package` QA, Elastic's agent skills, and the OVHcloud Terraform provider and developer platform.
4. **The integrations:** a tour of the OVHcloud integration set and its dashboards.
5. **Live demo:** break something on purpose and watch it show up in Kibana.
6. **Your questions**, and how to try, test and contribute.

## Slide decks

The deck is available in two formats in [`meetup-slides-export/`](meetup-slides-export/):

| File | Format |
|------|--------|
| [`ovh-elastic-meetup.pdf`](meetup-slides-export/ovh-elastic-meetup.pdf) | PDF, for reading and sharing |
| [`ovh-elastic-meetup-export-2026-11-18.html`](meetup-slides-export/ovh-elastic-meetup-export-2026-11-18.html) | Single self-contained HTML file. Download it and open it in a browser. |

## OVHcloud integrations

The packaged integrations are in [`ovhcloud integrations/`](ovhcloud%20integrations/). Each zip is an Elastic integration package with its data streams, ingest pipelines, field mappings and Kibana dashboards.

| Integration | Package | What it monitors | Data streams | Dashboards |
|-------------|---------|------------------|--------------|------------|
| OVHcloud AI & Machine Learning | [`ovh_ai_ml-1.0.0.zip`](ovhcloud%20integrations/ovh_ai_ml-1.0.0.zip) | AI Deploy app lifecycle and AI Training job state changes | `deploy`, `training` | 1 |
| OVHcloud Billing | [`ovh_billing-1.1.0.zip`](ovhcloud%20integrations/ovh_billing-1.1.0.zip) | Account details and billing activity (bills, spend) through the OVHcloud REST API | `account`, `bill` | 2 |
| OVHcloud Managed Databases | [`ovh_dbaas-1.0.0.zip`](ovhcloud%20integrations/ovh_dbaas-1.0.0.zip) | Cluster state, backups and maintenance windows of DBaaS on Public Cloud | `cluster`, `backup`, `maintenance` | 1 |
| OVHcloud Dedicated Servers | [`ovh_dedicated_servers-1.1.0.zip`](ovhcloud%20integrations/ovh_dedicated_servers-1.1.0.zip) | Server tasks, hardware interventions, provisioning activity log and backup FTP ACLs | `task`, `intervention`, `log`, `backup_acl` | 3 |
| OVHcloud Managed Kubernetes | [`ovh_managed_kubernetes-1.1.0.zip`](ovhcloud%20integrations/ovh_managed_kubernetes-1.1.0.zip) | Clusters, node pools and nodes, plus the Kubernetes audit logs | `cluster`, `nodepool`, `node`, `audit` | 4 |
| OVHcloud Object Storage | [`ovh_object_storage-1.0.0.zip`](ovhcloud%20integrations/ovh_object_storage-1.0.0.zip) | Container inventory, configuration, encryption, versioning and replication state | `container` | 1 |
| OVHcloud Managed Rancher Service | [`ovh_rancher-1.0.0.zip`](ovhcloud%20integrations/ovh_rancher-1.0.0.zip) | Rancher service state, events and tasks | `rancher`, `event`, `task` | 1 |

## Add them to Kibana

These are custom integrations, so they are not in the Fleet catalog. Fleet can install them from a zip file, as described in the official Elastic documentation: [Upload an integration to Kibana](https://www.elastic.co/docs/extend/integrations/upload-new-integration). Use one of the two options below.

### Option 1: Fleet API (`curl`)

Works with any Kibana deployment, including Elastic Cloud and air-gapped setups.

```bash
curl -XPOST \
  -H 'content-type: application/zip' \
  -H 'kbn-xsrf: true' \
  https://your.kibana.host/api/fleet/epm/packages \
  -u {username}:{password} \
  --data-binary @"ovhcloud integrations/ovh_billing-1.1.0.zip"
```

To install all of them:

```bash
for z in "ovhcloud integrations"/*.zip; do
  curl -XPOST -H 'content-type: application/zip' -H 'kbn-xsrf: true' \
    https://your.kibana.host/api/fleet/epm/packages \
    -u {username}:{password} --data-binary @"$z"
done
```

### Option 2: `elastic-package`

Unzip the package, then install it from its folder with [`elastic-package`](https://github.com/elastic/elastic-package):

```bash
unzip "ovhcloud integrations/ovh_billing-1.1.0.zip"
cd ovh_billing-1.1.0

export ELASTIC_PACKAGE_KIBANA_HOST=https://your.kibana.host
export ELASTIC_PACKAGE_ELASTICSEARCH_API_KEY=<elastic_api_key>   # or USERNAME / PASSWORD
elastic-package install
```

### After the upload

1. In Kibana, open **Integrations** and find the installed OVHcloud integration.
2. Choose **Add integration**, enter your OVHcloud API credentials and pick the data streams to collect.
3. Attach it to an Elastic Agent policy.
4. Open **Dashboards** and search for `OVHcloud`. The dashboards are installed with the package.

Installing, reinstalling and removing integration assets is covered in [Install and uninstall Elastic Agent integration assets](https://www.elastic.co/docs/reference/fleet/install-uninstall-integration-assets).

## Resources

- [OVHcloud Developer Hub](https://developers.eu.ovhcloud.com)
- [OVHcloud Terraform provider](https://registry.terraform.io/providers/ovh/ovh)
- [Elastic Integrations on GitHub](https://github.com/elastic/integrations)
- [Elastic integration skills](https://github.com/elastic/integration-skills) and [agent skills](https://github.com/elastic/agent-skills)
- [Our OVHcloud integrations](https://github.com/fred-maussion/community_elastic-custom-integrations)
- [Elastic Cloud free trial](https://cloud.elastic.co/registration)
