---
applyTo: '**/*.ts, **/*.tsx, server/**, mcp-server/**'
description: 'TypeScript best practices specifically for implementing MCP (Model Copilot) servers and extensions'
---

# TypeScript + MCP Server Best Practices

Purpose: Guidance for building robust, typed MCP servers and extensions in TypeScript. Focus on clear contracts between the LLM, connector code, and downstream tools; safe serialization, validation, and observability.

## 1. API Contract & Types
- Define explicit Request/Response types for every endpoint/handler. Keep a shared `types/` package or file that both client and server import for type-safety.
- Keep messages and events versioned. Add a `protocolVersion` or `schemaVersion` property to payloads to allow safe upgrades.

Example:
```ts
export type MCPRequest<T = unknown> = {
  id: string;
  method: string;
  params: T;
  timestamp: string;
  protocolVersion: string;
};

export type MCPResponse<R = unknown> = {
  id: string;
  result?: R;
  error?: { code: number; message: string };
  protocolVersion: string;
};
```

## 2. Validation & Runtime Safety
- At service boundaries validate payloads with Zod/io-ts. Derive TypeScript types from schemas to reduce duplication.
- Reject unexpected or unknown properties by default unless explicitly allowed.

## 3. Serialization & Streaming
- Use stable, explicit JSON serialization. When streaming large content, use NDJSON or chunked JSON boundaries and annotate each chunk with a type field.
- For binary artifacts, use multipart or base64 with clear content-type and length metadata.

## 4. Error Handling
- Use structured errors with codes and (optional) machine‑readable metadata.
- Never leak stack traces or internal implementation details in public responses; log them securely server-side.

## 5. Security & Access Control
- Authenticate requests and enforce least-privilege access on handlers.
- Sanitize all inputs. Treat model-generated content as untrusted when executing downstream actions.
- Rate-limit and monitor suspicious patterns (repeated malformed requests, unusual payload sizes).

## 6. Observability
- Add structured logs (JSON) with request IDs, handler names, latency, and status codes.
- Emit metrics (request count, error rate, latency histograms) to your monitoring system (Prometheus, Datadog).
- Trace important operations with OpenTelemetry-compatible spans.

## 7. Typing Patterns & Helpers
- Use discriminated unions for event/message types.
- Provide helper functions for `isMCPRequest()` type-guards and `assertMCPResponse()` for runtime checks.
- Use `as const` for static opcode/tag values and derive literal types.

## 8. Testing
- Unit test handlers with mocked dependencies (storage, network). Use fixtures to represent model outputs.
- Integration test the serialization/transport layer (including streaming scenarios) with small local harnesses.
- Add property-based tests for serialization round-trips if you accept complex nested objects.

## 9. Performance & Resource Controls
- Limit maximum payload size and reject or stream large bodies.
- For CPU-heavy transforms, offload to worker threads or separate processes and keep the main server event loop responsive.
- Cache frequent responses where appropriate and invalidate carefully.

## 10. Deployment & Compatibility
- Use semantic versioning for your MCP server packages.
- Document breaking changes in `CHANGELOG.md` and provide a migration guide when protocol changes are required.

## 11. Example Handler Skeleton
```ts
import { z } from 'zod';

const DoThingParams = z.object({ name: z.string(), count: z.number().int().nonnegative() });
export type DoThingParams = z.infer<typeof DoThingParams>;

export async function handleDoThing(req: MCPRequest<unknown>): Promise<MCPResponse> {
  const parsed = DoThingParams.safeParse(req.params);
  if (!parsed.success) {
    return { id: req.id, error: { code: 400, message: 'Invalid params' }, protocolVersion: req.protocolVersion };
  }

  // business logic
  const result = await doBusiness(parsed.data);
  return { id: req.id, result, protocolVersion: req.protocolVersion };
}
```

## 12. Copilot Checklist for MCP TypeScript
- ✅ Versioned request/response types and schema evolution strategy.  
- ✅ Runtime validation on all inbound payloads.  
- ✅ Structured errors and safe logging.  
- ✅ Observability (logs/metrics/traces).  
- ✅ Size/timeout/rate controls for safety.  
- ✅ Tests covering handler logic, serialization, and streaming.


---

For larger projects, split contract types into a shared `@yourorg/mcp-types` package to keep client and server aligned and to allow incremental adoption.