import SwaggerClient from "./SwaggerClient";
import { swaggerSpec } from "./swagger";

export default function ApiDocsPage() {
return <SwaggerClient spec={swaggerSpec} />;
}