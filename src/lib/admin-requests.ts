"use server"
import { PaginationParams } from "@/components/Pagination";
import axios from "axios";

let adminUrl = process.env.ADMIN_API_URL;

export async function postUpstream(body: any) {
    try {
        const { data } = await axios.post(`${adminUrl}/upstreams`, body);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function getUpstreams({ limit, offset, text }: PaginationParams) {
    try {
        const { data } = await axios.get(`${adminUrl}/upstreams?offset=${offset}&limit=${limit}&text=${text}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function linkConsumerToRoute(consumerId: number | string, routeId: number | string) {
    try {
        const { data } = await axios.put(`${adminUrl}/consumers/${consumerId}/routes/${routeId}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function getConsumerRoutes(consumerId: number | string, { limit, offset, text }: PaginationParams) {
    try {
        const { data } = await axios.get(`${adminUrl}/consumers/${consumerId}/routes?offset=${offset}&limit=${limit}&text=${text}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function deleteConsumerRoute(consumerId: number | string, routeId: number | string) {
    try {
        const { data } = await axios.delete(`${adminUrl}/consumers/${consumerId}/routes/${routeId}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function postRoute(upstreamId: number | string, body: any) {
    try {
        const { data } = await axios.post(`${adminUrl}/upstreams/${upstreamId}/routes`, body);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function getUpstreamRoutes(upstreamsId: number | string, { limit, offset, text }: PaginationParams) {
    try {
        const { data } = await axios.get(`${adminUrl}/upstreams/${upstreamsId}/routes?offset=${offset}&limit=${limit}&text=${text}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function deleteUpstreamRoute(upstreamsId: number | string, routeId: number | string) {
    try {
        const { data } = await axios.delete(`${adminUrl}/upstreams/${upstreamsId}/routes/${routeId}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function postTarget(upstreamId: number | string, body: any) {
    try {
        const { data } = await axios.post(`${adminUrl}/upstreams/${upstreamId}/targets`, body);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function getUpstream(upstreamId: number | string) {
    try {
        const { data } = await axios.get(`${adminUrl}/upstreams/${upstreamId}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function putUpstream(upstreamId: number | string, body: any) {
    try {
        let { data } = await axios.put(`${adminUrl}/upstreams/${upstreamId}`, body);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function deleteUpstream(upstreamId: number | string) {
    try {
        let { data } = await axios.delete(`${adminUrl}/upstreams/${upstreamId}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function postConsumer(body: any) {
    try {
        let { data } = await axios.post(`${adminUrl}/consumers`, body);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function getConsumers({ offset, limit, text }: PaginationParams) {
    try {
        let { data } = await axios.get(`${adminUrl}/consumers?offset=${offset}&limit=${limit}&text=${text}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function getUpstreamTargets(upstreamId: number | string, { offset, limit, text }: PaginationParams) {
    try {
        let { data } = await axios.get(`${adminUrl}/upstreams/${upstreamId}/targets?offset=${offset}&limit=${limit}&text=${text}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function deleteUpstreamTarget(upstreamsId: number | string, targetId: number | string) {
    try {
        const { data } = await axios.delete(`${adminUrl}/upstreams/${upstreamsId}/targets/${targetId}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function getConsumer(consumerId: number | string) {
    try {
        const { data } = await axios.get(`${adminUrl}/consumers/${consumerId}`);
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function putConsumer(consumerId: number | string, body: any) {
    try {
        let { data } = await axios.put(`${adminUrl}/consumers/${consumerId}`, body)
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}

export async function deleteConsumer(consumerId: number | string) {
    try {
        let { data } = await axios.delete(`${adminUrl}/consumers/${consumerId}`)
        return data;
    } catch (e) {
        throw { message: "Failed to make request" };
    }
}
